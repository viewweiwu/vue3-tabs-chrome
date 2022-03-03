<template>
  <vue3-tabs-chrome
    :tabs="tabs"
    v-model="tab"
    @swap="handleSwap"
    @dragstart="handleDragStart"
    @dragging="handleDragging"
    @dragend="handleDragEnd"
    @contextmenu="handleContextMenu"
    @click="handleClick"
    @remove="handleRemove"
  />
  <div class="events-tip">
    <p>List of events that can be triggered.</p>
    <p>The "dragging" event is too much, so it is omitted from the display and can be seen in the console again.</p>
    <ul>
      <li>click</li>
      <li>remove</li>
      <li>swap</li>
      <li>contextmenu</li>
      <li>dragstart</li>
      <li>dragging</li>
      <li>dragend</li>
    </ul>
  </div>
  {{ events }}
  <p>
    <button class="btn" @click="handleClear">Clear Events</button>
  </p>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import Vue3TabsChrome, { Tab } from '../../package/vue3-tabs-chrome.vue'
import '../../package/theme-dark.less'

export default defineComponent({
  name: 'App',
  components: {
    Vue3TabsChrome
  },
  setup() {
    const tabRef: Ref = ref()
    const tab: Ref = ref('google')
    const events: Array<string> = reactive<Array<string>>([])
    const tabs: Array<Tab> = reactive<Array<Tab>>([
      {
        label: 'google',
        key: 'google',
        favico: require('../assets/google.jpg')
      },
      {
        label: 'facebook',
        key: 'facebook',
        favico: require('../assets/fb.jpg')
      },
      {
        label: 'New Tab',
        key: 'costom key',
        favico: () => {
          return '😆'
        }
      }
    ])

    const setTabRef = (el: HTMLElement) => {
      tabRef.value = el
    }

    const handleSwap = (tab: Tab, swapTab: Tab) => {
      console.log(tab, swapTab)
      events.push('swap')
    }

    const handleClear = () => {
      events.splice(0, events.length)
    }

    const handleDragStart = (event: Event, tab: Tab, index: number) => {
      console.log(event, tab, index)
      events.push('dragstart')
    }

    const handleDragging = (event: Event, tab: Tab, index: number) => {
      console.log(event, tab, index)
      //   events.push('dragging')
    }

    const handleDragEnd = (event: Event, tab: Tab, index: number) => {
      console.log(event, tab, index)
      events.push('dragend')
    }

    const handleContextMenu = (event: Event, tab: Tab, index: number) => {
      // event.preventDefault()
      // event.stopPropagation()
      console.log(event, tab, index)
      events.push('contextmenu')
    }

    const handleClick = (event: Event, tab: Tab, index: number) => {
      console.log(event, tab, index)
      events.push('click')
    }

    const handleRemove = (tab: Tab, index: number) => {
      console.log(tab, index)
      events.push('remove')
    }

    return {
      tabs,
      tab,
      events,
      setTabRef,
      handleSwap,
      handleDragStart,
      handleDragging,
      handleDragEnd,
      handleContextMenu,
      handleClick,
      handleRemove,
      handleClear
    }
  }
})
</script>

<style lang="less">
.events-tip {
  color: #999;
}
</style>
