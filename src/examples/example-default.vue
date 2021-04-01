<template>
  <vue3-tabs-chrome :ref="setTabRef" :tabs="tabs" v-model="tab" />
  <div class="btns">
    <button class="btn" @click="handleAdd">new Tab</button>
    <button class="btn" @click="handleRemove">Remove Active Tab</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import Vue3TabsChrome, { Tab } from '../../package/vue3-tabs-chrome.vue'

export default defineComponent({
  name: 'App',
  components: {
    Vue3TabsChrome
  },
  setup() {
    const tabRef: Ref = ref()
    const tab: Ref = ref('google')
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

    const handleAdd = () => {
      tabRef.value.addTab({
        label: 'New Tab',
        key: 'tab' + Date.now()
      })
    }

    const handleRemove = () => {
      tabRef.value.removeTab(tab.value)
    }

    return {
      tabs,
      tab,
      handleAdd,
      handleRemove,
      setTabRef
    }
  }
})
</script>

<style lang="less">
.events-tip {
  color: #999;
}
</style>
