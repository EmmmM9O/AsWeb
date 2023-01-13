<script setup lang="ts">
import {RouterLink} from 'vue-router'
import {ref,computed} from 'vue'
interface Page{
    name:String,
    url:String,
}
defineProps<{
    PageList:Array<Page>
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
    <div class="TopList">
        <router-link v-bind:to="item.url" type="button" class="DaoHang" v-for="item in PageList" :class="item.url==currentHash ? 'DaoHang2' : ''">{{ item.name }}</router-link >
    </div>
</template>
<style scoped>
.YinYing{
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
              rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
.TopList{
    display: flex;
      box-shadow: rgb(0 0 0 / 20%) 0px 2px 0px -1px,
        rgb(0 0 0 / 14%) 0px 1px 0px 0px, rgb(0 0 0 / 12%) 0px 0px 0px 0px;
    line-height:10vh;
    margin: 0;
    text-align:center;
    height: 10vh;
    width: 90vw;
    background-color: #eee;
    border-bottom: 4px solid white;
}
.DaoHang{
    background-color: rgb(0 0 0 / 5%);
    height: 10vh;
    width: auto;
    font-size: 8vh;
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