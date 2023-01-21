<script setup lang="ts">
import User from './Struct/User.vue';
import {reactive, ref} from 'vue';
import { SideBarStore } from './stores/sidebar';
import type { Ref } from 'vue';
import font from '@/assets/fonts/Os.ttf'
const stores = SideBarStore();
const color:Ref<string> =ref('gray');
const fo=reactive({
    fontFamily: 'Os',
    src: 'url('+font+')'
})
</script>
<template>
    <div class="SideBar" :class="stores.showAddon?'Addon':''">
        <div class="SideBar-list" :class="stores.showAddon?'SideBar-list2':''">
        <button class="dButton" @click="stores.changet()">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><path d="M19,8H5A1,1,0,0,1,5,6H19a1,1,0,0,1,0,2Z" :fill="color"/><path d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" :fill="color"/><path d="M19,18H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" :fill="color"/></svg>
        </button>
        <span class="SideBar-span" :class="fo" :style="{opacity:stores.showAddon?1:0}">列表</span>
        </div>
        <div class="line"></div>
        <div class="SideBar-list" :class="stores.showAddon?'SideBar-list2':''">
            <User/>
            <span class="SideBar-span" :class="fo" :style="{opacity:stores.showAddon?1:0}">用户</span>
        </div>
    </div>
</template>
<style scoped>
@import '@/assets/colorful.css';


.Addon{
    width:200px
}
.line{
    width: 100%;
    height: 4px;
    margin-top: 2px;
    margin-bottom: 2px;
    background-color: black;
    opacity: 1.2;
}
.dButton{
    background-color: rgba(0, 0, 0, 0);
    float: left;
    border: none;
    width: 80px;
    height: 80px;
    padding: 0px 0px;
}
.SideBar{
    backdrop-filter: blur(18px);
    border-radius: 12px;
    overflow: hidden;
    align-items: center;
    display: flex;
    flex:1;
    flex-direction: column;
    text-align:center;
    margin: 0;
    height: 98vh;
    padding-bottom: 2vh;
    transition: 0.5s;
    width: 80px;
    background-image: linear-gradient(-225deg,rgba(44,216,213,0.5) 0%, rgba(197,193,255,0.5) 56%, rgba(255,186,195,0.5) 100%);
    opacity:0.6;
}
.SideBar-list{
    display: inline-flex;
    flex-wrap: nowrap;
    flex-direction: row;
    width: 80px;
    height: 80px;
    margin-top: 4px;
    transition: 0.5s;
}

.SideBar-span{
    color:black;
    line-height:80px;
    font-size: 55px;
    position: absolute;
    white-space:nowrap;
    margin-left:85px;
    transition: 0.6s;
    opacity: 0;
}
.SideBar-list2{
    width: 200px;
}
.SideBar-list:hover{
    margin-left: 6px;
    left:-6px;
    border-left: 6px solid white;
    background-color: rgba(255, 255, 255, 0.2);
}

.SideBar:hover{
    width: 200px;
}
.YinYing{
      box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
        rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
</style>