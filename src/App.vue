<template>
  <div class="page">
    <h1>vue3-tabs-chrome</h1>
    <p>A Vue3 component for Chrome-like tabs.</p>
    <a target="_blank" href="https://github.com/viewweiwu/vue3-tabs-chrome">
      <button class="btn">
        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1273111538,3388165957&fm=26&gp=0.jpg" alt="" />
        github
      </button>
    </a>
    <h2>Event Default</h2>
    <p>
      <a target="_blank" href="https://github.com/viewweiwu/vue3-tabs-chrome/blob/master/src/examples/example-default.vue">code</a>
    </p>
    <div class="example">
      <example-default />
    </div>
    <h2>Theme Dark</h2>
    <p>
      <a target="_blank" href="https://github.com/viewweiwu/vue3-tabs-chrome/blob/master/src/examples/example-theme-dark.vue">code</a>
    </p>
    <div class="example" style="background-color: #2f2f33;">
      <example-theme-dark />
    </div>
    <h2>Insert to tag's after</h2>
    <p>
      <a target="_blank" href="https://github.com/viewweiwu/vue3-tabs-chrome/blob/master/src/examples/example-insert-to-after.vue">code</a>
    </p>
    <div class="example">
      <example-insert-to-after />
    </div>
    <h2>Event Listener</h2>
    <p>
      <a target="_blank" href="https://github.com/viewweiwu/vue3-tabs-chrome/blob/master/src/examples/example-events.vue">code</a>
    </p>
    <div class="example">
      <example-events />
    </div>
    <h2>after slots</h2>
    <p>
      <a target="_blank" href="https://github.com/viewweiwu/vue3-tabs-chrome/blob/master/src/examples/example-slots-after.vue">code</a>
    </p>
    <div class="example">
      <example-slots-after />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExampleDefault from './examples/example-default.vue'
import ExampleThemeDark from './examples/example-theme-dark.vue'
import ExampleInsertToAfter from './examples/example-insert-to-after.vue'
import ExampleEvents from './examples/example-events.vue'
import ExampleSlotsAfter from './examples/example-slots-after.vue'

export default defineComponent({
  name: 'App',
  components: {
    ExampleDefault,
    ExampleThemeDark,
    ExampleInsertToAfter,
    ExampleEvents,
    ExampleSlotsAfter
  }
})
</script>

<style lang="less">
body {
  margin: 0;
  color: #2c3e50;
  background-image: url(./assets/bg.png);
}

.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 0;
}

.tip {
  padding: 8px 12px;
  margin: 12px 0;
  border-left: 2px solid blueviolet;
  background-color: #fff;
}

.btn {
  border: 1px solid #f06;
  padding: 10px 16px;
  border-radius: 2px;
  border: 1px solid #fff;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background-color: #fff;
  user-select: none;
  cursor: pointer;
}

.btn + .btn {
  margin-left: 30px;
}

.btns {
  padding: 50px 30px;
}

h1,
h2 {
  font-weight: 700;
  letter-spacing: 1px;
  color: #666;
  text-shadow: 1px 1px 1px #fff;
}

h2 {
  margin: 55px 0 15px;
}

a {
  color: #ff4081;
  text-decoration: none;
  cursor: pointer;
}

a img {
  height: 1.5em;
  margin-right: 10px;
  vertical-align: middle;
}

.example {
  min-height: 200px;
  padding: 20px;
  background-color: #fff;
}
</style>
