<script setup lang="ts">
import type { StepTimingFunction } from 'csstype';
import {ref} from 'vue';
import Nav from './vue/Nav.vue'
import SideBar from './vue/SideBar.vue'
interface Page{
    [index:string]:string;
}
const PageList={
    '/':'主页',
    '/map':'地图'
}as Page;
</script>
<template>
    <header class="flex">
        <SideBar/>
        <div className='other'>
            <Nav v-bind:PageList="PageList"/>
        </div>
    </header>
</template>
<style scoped>
header{
    width: 100vw;
    height: 100vh;
    margin:0;
    background-color: #eee;
}
.flex{
    display: flex;
}
.YinYing{
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
.other{
  display:flex;
  flex:1;
  flex-direction: column;
}
</style>
