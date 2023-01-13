<script lang="ts">
/*
import {readonly} from 'vue';
interface Page{
    readonly name:String,
    readonly url:String
}
defineProps<{
    PageList:Array<Page>
}>();
*/
import { defineComponent, readonly } from 'vue';
import './Nav.css'
interface Page{
    readonly name:String,
    readonly url:String
}
export default defineComponent({
    props:{
        PageList:Array<Page>
    }
});

</script>
<template>
</template>
<style scoped>
.YinYing{
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
              rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;

}
</style>