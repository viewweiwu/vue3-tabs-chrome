<template>
  <div class="page">
    <h2>Event Default</h2>
    <div class="example">
      <example-default />
    </div>
    <h2>Event Listener</h2>
    <div class="example">
      <example-events />
    </div>
    <h2>Theme Dark</h2>
    <div class="example" style="background-color: #2f2f33;">
      <example-theme-dark />
    </div>
    <h2>after slots</h2>
    <div class="example">
      <example-slots-after />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref } from 'vue'
import ExampleDefault from './examples/example-default.vue'
import ExampleEvents from './examples/example-events.vue'
import ExampleThemeDark from './examples/example-theme-dark.vue'
import ExampleSlotsAfter from './examples/example-slots-after.vue'

export default defineComponent({
  name: 'App',
  components: {
    ExampleDefault,
    ExampleEvents,
    ExampleThemeDark,
    ExampleSlotsAfter
  }
})
</script>

<style lang="less">
body {
  margin: 0;
  color: #2c3e50;
  background-color: #f3f4f5;
}

.page {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 50px;
}

.tip {
  padding: 8px 12px;
  margin: 12px 0;
  border-left: 2px solid blueviolet;
  background-color: #fff;
}

.btn {
  border: 1px solid #f06;
  margin-left: 30px;
  padding: 10px 16px;
  border-radius: 2px;
  border: 1px solid #fff;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background-color: #fff;
  user-select: none;
}

.btns {
  margin-top: 50px;
}

h2 {
  font-weight: 400;
  color: #999;
}

.example {
  min-height: 200px;
  padding: 20px;
  background-color: #fff;
}
</style>
