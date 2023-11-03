<template>
 <div>This is A</div>
</template>
<script>
import B from './B.vue'
import C from './subComponents/C.vue'
import { Button } from 'ant-design-vue'
import { Message as MyMessage } from 'ant-design-vue'
export default {
    name : "A",
    components : [B,C],
    data(){
        return {
            msg : "This is A"
        }
    }
}
</script>