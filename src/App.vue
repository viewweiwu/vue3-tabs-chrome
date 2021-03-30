<template>
  {{ tab }}
  <vue-3-tabs-chrome :tabs="tabs" v-model="tab" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Vue3TabsChrome from '../package/Vue3TabsChrome.vue'

export default defineComponent({
  name: 'App',
  components: {
    Vue3TabsChrome
  },
  setup() {
    const tab = ref('google')
    const tabs = reactive([
      {
        label: 'google',
        key: 'google',
        favico: require('./assets/google.jpg'),
        closable: false
      },
      {
        label: 'facebook',
        key: 'facebook',
        favico: require('./assets/fb.jpg')
      },
      {
        label: 'New Tab',
        key: 'costom key'
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
