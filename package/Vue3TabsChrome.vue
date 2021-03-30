<template>
  <div class="vue3-tabs-chrome">
    <div class="tabs-content" :ref="setContentRef">
      <div
        class="tabs-item"
        v-for="(tab, i) in tabs"
        :class="{ active: tab.key === modelValue }"
        :key="tab.key"
        :style="{ width: tabWidth + 'px' }"
        :ref="e => setTabRef(e, tab)"
      >
        <div class="tabs-background">
          <div class="tabs-background-content"></div>
          <svg class="tabs-background-before" width="7" height="7">
            <path d="M 0 7 A 7 7 0 0 0 7 0 L 7 7 Z"></path>
          </svg>
          <svg class="tabs-background-after" width="7" height="7">
            <path d="M 0 0 A 7 7 0 0 0 7 7 L 0 7 Z"></path>
          </svg>
        </div>
        <div class="tabs-close" @click.stop="handleDelete(tab, i)">
          <svg class="tabs-close-icon" width="16" height="16" stroke="#595959">
            <path d="M 4 4 L 12 12 M 12 4 L 4 12"></path>
          </svg>
        </div>
        <div class="tabs-main" :title="tab.label">
          <span class="tabs-favicon" v-if="tab.favico">
            <img v-if="tab.favico" :src="tab.favico" alt="" />
          </span>
          <span class="tabs-label">{{ tab.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Draggabilly from 'draggabilly'
import { defineComponent, ref, reactive, onMounted, PropType, nextTick } from 'vue'

export interface Tab {
  /** 显示名称 */
  label: string
  /** 唯一 key */
  key: string
  $el?: HTMLElement
  _instance?: any
  _x?: number
  /**
   * 是否可被交换
   */
  swappable?: boolean
  /**
   * 是否可拖拽
   */
  dragable?: boolean
}

export interface Refs {
  [key: string]: HTMLElement | null
}

export default defineComponent({
  name: 'vue3-tabs-chrome',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    tabs: {
      type: Array as PropType<Tab[]>,
      default: () => []
    },
    /**
     * tab 的最小宽度
     */
    minWidth: {
      type: Number,
      default: 40
    },
    /**
     * tab 的最大宽度
     */
    maxWidth: {
      type: Number,
      default: 245
    },
    /**
     * 两个相邻的 tab 的空隙大小
     */
    gap: {
      type: Number,
      default: 7
    }
  },
  setup(props, context) {
    const $refs = reactive<Refs>({})
    const tabWidth = ref<number>(0)

    /**
     * 计算单个 tab 的宽度
     */
    const calcTabWidth = () => {
      const tabs = props.tabs
      const maxWidth = props.maxWidth
      const minWidth = props.minWidth
      const gap = props.gap
      const $content: HTMLElement | null = $refs.$content
      const afterWidth = 0
      // // let after = this.$refs.after
      // // let afterWidth = after.getBoundingClientRect().width
      if (!$content) return Math.max(maxWidth, minWidth)
      const contentWidth: number = $content.clientWidth - gap * 3 - afterWidth
      let width: number = contentWidth / tabs.length
      width += gap * 2
      if (width > maxWidth) width = maxWidth
      if (width < minWidth) width = minWidth
      tabWidth.value = width
    }

    const handlePointerDown = (e: Event, tab: Tab, i: number) => {
      const emit = context.emit
      console.log(1111)
      emit('update:modelValue', tab.key)
      emit('dragstart', e, tab, i)
    }

    const handleDragMove = (e: Event, tab: Tab, i: number) => {
      const tabs = props.tabs
      const gap = props.gap

      if (tab.swappable === false) {
        return
      }

      // 获取一般 tab 宽度
      const halfWidth: number = (tabWidth.value - gap) / 2
      // 获取 tab 当前的 x 值
      const x = tab._instance.position.x
      let swapTab: Tab | null = null
      for (let i = 0; i < tabs.length; i++) {
        const currentTab: Tab = tabs[i]
        const targetX = (currentTab._x || 0) - 1
        // 如果命中自己本身，则无需交换
        if (tab.key === currentTab.key) {
          continue
        }
        // 判断是否有重叠的 tab
        if (targetX <= x && x < targetX + halfWidth / 2) {
          swapTab = currentTab
        }
      }
      if (swapTab) {
        swapTabs(tab, swapTab)
      }
    }

    /**
     * 交换俩 tab
     */
    const swapTabs = (tab: Tab, swapTab: Tab) => {
      if (swapTab.swappable === false) {
        return
      }
      const tabs = props.tabs
      const emit = context.emit

      const index = tabs.findIndex((obj: Tab) => obj.key === tab.key)
      const swapIndex = tabs.findIndex((obj: Tab) => obj.key === swapTab.key)

      if (index !== swapIndex) {
        // eslint-disable-next-line
        ;[tabs[index], tabs[swapIndex]] = [tabs[swapIndex], tabs[index]]
      }

      // swap x
      const _x = tab._x
      tab._x = swapTab._x
      swapTab._x = _x

      // swap position
      const _instance = swapTab._instance
      setTimeout(() => {
        _instance.element.classList.add('move')
        _instance.setPosition(_x, _instance.position.y)
      }, 50)
      setTimeout(() => {
        _instance.element.classList.remove('move')
        emit('swap', tab, swapTab)
      }, 200)
    }

    /**
     * 拖拽完成监听
     */
    const handleDragEnd = (e: Event, tab: Tab, i: number) => {
      const _instance = tab._instance
      const emit = context.emit

      if (_instance.position.x === 0) return
      setTimeout(() => {
        _instance.element.classList.add('move')
        _instance.setPosition(tab._x, 0)
      }, 50)
      setTimeout(() => {
        _instance.element.classList.remove('move')
        emit('dragend', e, tab)
      }, 200)
      return false
    }

    /**
     * 删除事件
     */
    const handleDelete = (tab: Tab, i: number) => {
      const tabs = props.tabs
      const modelValue = props.modelValue
      const emit = context.emit
      const index = tabs.findIndex(item => item.key === modelValue)
      let after, before
      if (i === index) {
        after = tabs[i + 1]
        before = tabs[i - 1]
      }

      if (after) {
        emit('update:modelValue', after.key)
      } else if (before) {
        emit('update:modelValue', before.key)
      } else if (tabs.length <= 1) {
        emit('update:modelValue', null)
      }
      tabs.splice(i, 1)

      nextTick(() => {
        doLayout()
      })
    }

    /**
     * 重新调整 tab 位置
     */
    const doLayout = () => {
      calcTabWidth()
      const tabs = props.tabs
      const gap = props.gap
      tabs.forEach((tab, i) => {
        const instance = tab._instance
        const _x = (tabWidth.value - gap * 2) * i
        tab._x = _x
        instance.setPosition(_x, 0)
      })
    }

    /**
     * 添加 tab 实例
     */
    const addInstance = (tab: Tab, i: number) => {
      const gap = props.gap

      // 如果已经存在实例，则重新设置位置
      if (tab._instance) {
        tab._instance.setPosition(tab._x, 0)
        return
      }
      // 如果不存在 dom 元素，则无需设置
      if (!tab.$el || !$refs.$content) {
        return
      }
      // 添加实例
      tab._instance = new Draggabilly(tab.$el, {
        axis: 'x',
        containment: $refs.$content,
        handle: '.tabs-main'
      })
      if (tab.dragable === false) {
        tab._instance.disable()
      }
      // 计算实际 x 值
      const x = (tabWidth.value - gap * 2) * i
      // 记录 x 位置到 tab 上
      tab._x = x
      // 设置位置
      tab._instance.setPosition(x, 0)
      // 绑定拖拽事件
      tab._instance.on('pointerDown', (e: Event) => handlePointerDown(e, tab, i))
      tab._instance.on('dragMove', (e: Event) => handleDragMove(e, tab, i))
      tab._instance.on('dragEnd', (e: Event) => handleDragEnd(e, tab, i))
    }

    /**
     * 初始化，为 tab 添加实例
     */
    const init = () => {
      props.tabs.forEach((tab: Tab, i: number) => {
        addInstance(tab, i)
      })
    }

    /**
     * 为 Tab 添加 dom 节点
     */
    const setTabRef = (el: HTMLElement, tab: Tab) => {
      if (el) {
        tab.$el = el
      }
    }

    /**
     * 添加容器 dom 节点
     */
    const setContentRef = (el: HTMLElement) => {
      if (el) {
        $refs.$content = el
      }
    }

    onMounted(() => {
      calcTabWidth()
      init()
    })

    return { setTabRef, setContentRef, tabWidth, handleDelete, doLayout }
  }
})
</script>

<style lang="less">
.vue3-tabs-chrome {
  @bg: #dee1e6;
  @gap: 7px;
  @divider: #a9adb0;
  @speed: 150ms;

  padding-top: 10px;
  background-color: @bg;
  position: relative;

  .tabs-content {
    height: 34px;
    position: relative;
    overflow: hidden;
  }
  /* divider */
  .tabs-divider {
    left: 0;
    top: 50%;
    width: 1px;
    height: 20px;
    background-color: @divider;
    position: absolute;
    transform: translateY(-50%);
  }

  .tabs-item {
    height: 100%;
    display: flex;
    align-items: center;
    user-select: none;
    box-sizing: border-box;
    transition: width @speed;
    position: absolute;
    // animation: tab-show @speed;
    &:hover {
      .tabs-background-content {
        background-color: #f2f3f5;
      }
      .tabs-background-before,
      .tabs-background-after {
        fill: #f2f3f5;
      }
    }
    &.move {
      transition: @speed;
    }
    &.is-dragging {
      z-index: 3;
      .tabs-background-content {
        background-color: #f2f3f5;
      }
      .tabs-background-before,
      .tabs-background-after {
        fill: #f2f3f5;
      }
    }
    &.active {
      z-index: 2;
      .tabs-background {
        opacity: 1;
      }
      .tabs-background-content {
        background-color: #fff;
      }
      .tabs-background-before,
      .tabs-background-after {
        fill: #fff;
      }
    }
    &:first-of-type {
      .tabs-dividers::before {
        opacity: 0;
      }
    }
    &:last-of-type {
      .tabs-dividers::after {
        opacity: 0;
      }
    }
  }
  .tabs-main {
    height: 100%;
    left: 0;
    right: 0;
    margin: 0 @gap * 2;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    transition: @speed;
    display: flex;
    align-items: center;
    position: absolute;
    box-sizing: border-box;
    overflow: hidden;
  }
  .tabs-close {
    top: 50%;
    right: @gap * 2;
    width: 16px;
    height: 16px;
    z-index: 1;
    position: absolute;
    transform: translateY(-50%);
  }
  .tabs-close-icon {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    &:hover {
      stroke: #000;
      background-color: #e8eaed;
    }
  }
  .tabs-favicon {
    height: 16px;
    margin-left: @gap;
    display: flex;
    align-items: center;
    overflow: hidden;
    img {
      height: 100%;
    }
  }
  .tabs-label {
    flex: 1;
    margin-left: @gap;
    margin-right: 16px;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    &.no-close {
      margin-right: @gap;
    }
  }

  /* background */
  .tabs-background {
    width: 100%;
    height: 100%;
    padding: 0 @gap - 1px;
    position: absolute;
    transition: opacity @speed * 2;
    box-sizing: border-box;
  }
  .tabs-background-content {
    height: 100%;
    border-top-left-radius: @gap;
    border-top-right-radius: @gap;
    transition: background @speed;
  }
  .tabs-background-before,
  .tabs-background-after {
    bottom: -1px;
    position: absolute;
    fill: transparent;
    transition: background @speed;
  }
  .tabs-background-before {
    left: -1px;
  }
  .tabs-background-after {
    right: -1px;
  }

  .tabs-footer {
    height: 4px;
    background-color: #fff;
  }

  .tabs-after {
    top: 50%;
    display: flex;
    position: absolute;
    overflow: hidden;
    transform: translateY(-50%);
  }

  @keyframes tab-show {
    from {
      transform: scaleX(0);
    }
    to {
      transform: scaleX(1);
    }
  }
}
.theme-dark {
  color: #9ca1a7;
  background-color: #202124;
  .tabs-item {
    &:hover {
      .tabs-background-content {
        background-color: #202124;
      }
      .tabs-background-before,
      .tabs-background-after {
        fill: transparent;
      }
    }
    &.is-dragging {
      .tabs-background-content {
        background-color: #202124;
      }
      .tabs-background-before,
      .tabs-background-after {
        fill: transparent;
      }
    }
    &.active {
      color: #fff;
      .tabs-background-content {
        background-color: #323639;
      }
      .tabs-background-before,
      .tabs-background-after {
        fill: #323639;
      }
    }
    .tabs-close-icon {
      stroke: #81878c;
      &:hover {
        stroke: #cfd1d2;
        background-color: #5f6368;
      }
    }
  }
  .tabs-divider {
    background-color: #4a4d51;
  }
  .tabs-footer {
    background-color: #323639;
  }
}
</style>
