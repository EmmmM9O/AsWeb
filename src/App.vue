<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
      // 启用了类型推导
    props: {
        msg: String
    },
    data(){
        return(
            {
                msg:'hello world'
            }
        )
    }
});
</script>
<template>
    <h1>{{msg}}</h1>
    <input v-model="msg">
</template>