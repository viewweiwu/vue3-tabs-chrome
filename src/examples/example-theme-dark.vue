<template>
  <vue3-tabs-chrome class="theme-dark" :tabs="tabs" v-model="tab" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import Vue3TabsChrome, { Tab } from '../../package/vue3-tabs-chrome.vue'
import '../theme-dark.less'

export default defineComponent({
  name: 'App',
  components: {
    Vue3TabsChrome
  },
  setup() {
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

    return {
      tabs,
      tab
    }
  }
})
</script>

<style lang="less">
.events-tip {
  color: #999;
}
</style>
