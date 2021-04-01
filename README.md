# vue3-tabs-chrome

A Vue3 component for Chrome-like tabs.<br>
Drag-and-drop support provided by Draggabilly by @desandro.

    Currently there is only a simple api, waiting for the completion.

If you are using Vue2, please see here.
https://github.com/viewweiwu/vue-tabs-chrome

## Live Demo

[https://viewweiwu.github.io/vue3-tabs-chrome/](https://viewweiwu.github.io/vue3-tabs-chrome/)

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

## Attributes

| Attributes                   | Description                                                                                                                          | Type                      | Default |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- | ------- |
| tabs                         | tabs configuration. Details are mentioned below.                                                                                     | Array                     | []      |
| modelValue / v-model         | binding value                                                                                                                        | String                    | -       |
| insert-to-after              | Insert to tag's after                                                                                                                | Boolean                   | false   |
| is-mousedown-active          | set tab is active when mousedown                                                                                                     | Boolean                   | true    |
| render-label                 | render label                                                                                                                         | Function(tab, index)      | -       |
| auto-hidden-close-icon-width | auto hidden close tab width. if tabWidth < 120, close icon can not show. If you don’t want this feature, you can set the value to 0. | Number                    | 120     |
| on-close                     | when tab close btn click. if return false, it cannot be closed.                                                                      | Function(tab, key, index) | -       |

## Tabs Attributes

| Attributes | Description                                                                                                                                                   | Type                            | Default |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------- |
| label      | tab label                                                                                                                                                     | String                          | -       |
| key        | tab key                                                                                                                                                       | String                          | -       |
| class      | tab class                                                                                                                                                     | String                          | -       |
| closable   | tab closable                                                                                                                                                  | Boolean                         | true    |
| dragable   | tab dragable                                                                                                                                                  | Boolean                         | true    |
| swappable  | tab swappable                                                                                                                                                 | Boolean                         | true    |
| favico     | tab favico. Custom favico renderer. It uses Vue's render function. It accepts two arguments: the first is h, the second is an object. including tab and index | Function(tab, index), image src | -       |

## Methods

| Method    | Description | Parameters                  |
| --------- | ----------- | --------------------------- |
| addTab    | add tab     | (tab1, [, ...tab, ...tabN]) |
| removeTab | remove tab  | (tabKey or index)           |

## Events

| Event Name  | Description                                                                                            | Parameters          |
| ----------- | ------------------------------------------------------------------------------------------------------ | ------------------- |
| click       | Triggered when the user's pointer is pressed and unpressed and has not moved enough to start dragging. | (event, tab, index) |
| swap        | Swap tab                                                                                               | (tab, targetTab)    |
| remove      | Remove tab                                                                                             | (tab, index)        |
| contextmenu | Contextmenu event                                                                                      | (event, tab, index) |
| dragstart   | Tab dragstart event                                                                                    | (event, tab, index) |
| dragging    | Tab dragstart event                                                                                    | (event, tab, index) |
| dragend     | Tab dragend event                                                                                      | (event, tab)        |

## Slots

| Attributes | Description    |
| ---------- | -------------- |
| after      | Tab after slot |

## License

MIT
