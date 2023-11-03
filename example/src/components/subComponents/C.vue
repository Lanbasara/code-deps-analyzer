<template>
  <div>This is C</div>
</template>
<script>
import A from "../A.vue";
import { utils } from '../../helpers/utils'
export default {
  name: "C",
  components: [A],
  data() {
    return {
      msg: "This is C",
    };
  },
};
</script>
