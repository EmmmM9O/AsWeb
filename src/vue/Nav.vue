<script setup lang="ts">

import {ref,computed, reactive} from 'vue'
interface Page{
    [index:string]:string;
}
defineProps<{
    PageList:Page
}>();
const currentPath = ref(window.location.hash)
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentHash = computed<String>(() => {
    return currentPath.value.slice(1) || '/'
})
/*
import { defineComponent, readonly } from 'vue';
interface Page{
    readonly name:String,
    readonly url:String
}
export default defineComponent({
    props:{
        PageList:Array<Page>
    }
});
*/
</script>
<template>
    <div class="TopList flex" v-for="(item,index) in PageList">
        <a type="button" class="DaoHang DaoHang2" v-if="index==currentHash">{{item}}</a>
        <a type="button" class="DaoHang" v-else>{{item}}</a>
    </div>
    
</template>
<style scoped>
.YinYing{
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
              rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
.TopList{
      box-shadow: rgb(0 0 0 / 20%) 0px 2px 0px -1px,
        rgb(0 0 0 / 14%) 0px 1px 0px 0px, rgb(0 0 0 / 12%) 0px 0px 0px 0px;
    line-height:10vh;
    margin: 0;
    text-align:center;
    height: 10vh;
    width: 90vw;
    margin-bottom: 4px;
    background-color: #eee;
    border-bottom: 4px solid white;
}
.flex{
    width:90vw;
    height: 10vh;
    white-space: nowrap;
    display: flex;
    overflow: hidden;
    flex: 1;
    flex-wrap:nowrap;
}
.DaoHang{
    display:inline;
    border: none;
    background-color: rgb(0 0 0 / 5%);
    height: 10vh;
    width: auto;
    font-size: 8vh;;
    color: #000;
    text-align: center;
    line-height:10vh;
    text-decoration:none;
}
.DaoHang:hover {
  background-color: white;
  color: black;
}
.DaoHang2{
    background-color: white;
}
</style>