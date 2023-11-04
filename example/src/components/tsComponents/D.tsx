import { defineComponent } from 'vue';
import { getAdapter } from '../../helpers/tools';
export default defineComponent({
  name: 'MyComponent',
  props: {
    msg: String,
  },
  methods: {
    getAdapter,
  },
  render() {
    return <div>{this.msg}</div>;
  },
});
