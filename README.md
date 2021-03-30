# vue3-tabs-chrome

A Vue3 component for Chrome-like tabs.<br>
Drag-and-drop support provided by Draggabilly by @desandro.

    Currently there is only a simple api, waiting for the completion.

If you are using Vue2, please see here.
https://github.com/viewweiwu/vue-tabs-chrome

## Code Sandbox

https://codesandbox.io/s/crazy-mcclintock-p514v?file=/src/App.vue

## Install

```bash
npm i vue3-tabs-chrome -S

# or

yarn add vue3-tabs-chrome -S
```

## Usage

```html
<template>
  <vue3-tabs-chrome :tabs="tabs" v-model="tab" />
</template>

<script>
  import Vue3TabsChrome from 'vue3-tabs-chrome'
  import 'vue3-tabs-chrome/dist/vue3-tabs-chrome.css'
  import { defineComponent, reactive, ref } from 'vue'

  export default defineComponent({
    components: {
      Vue3TabsChrome
    },
    setup() {
      const tab = ref('google')
      const tabs = reactive([
        {
          label: 'google',
          key: 'google',
          favico: require('./assets/google.jpg')
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
```
