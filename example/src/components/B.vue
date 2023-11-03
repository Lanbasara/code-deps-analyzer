<template>
  <div>This is B</div>
</template>
<script>
import C from "./subComponents/C.vue";
export default {
  name: "B",
  components: [C],
  data() {
    return {
      msg: "This is B",
    };
  },
};
</script>
