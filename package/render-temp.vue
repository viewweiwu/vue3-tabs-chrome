<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'render-temp',
  props: {
    render: {
      type: Function
    },
    params: {
      type: Array,
      default: () => []
    }
  },
  render() {
    return this.render && this.render(...this.params)
  }
})
</script>
