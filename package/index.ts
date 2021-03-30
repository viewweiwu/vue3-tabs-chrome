import { App, Plugin } from 'vue'
import Vue3TabsChrome from './Vue3TabsChrome.vue'

const install = (app: App) => {
  app.component('Vue3TabsChrome', Vue3TabsChrome)
}

Vue3TabsChrome.install = install

export { Vue3TabsChrome }

export default Vue3TabsChrome as unknown as Plugin
