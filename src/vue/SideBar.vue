<script setup lang="ts">
import User from './Struct/User.vue';
import {ref} from 'vue';
import { SideBarStore } from './stores/sidebar';
import DefSpan from './Struct/DefSpan.vue';
import type { Ref } from 'vue';
const stores = SideBarStore();
const color:Ref<string> =ref('gray');
</script>
<template>
    <div class="SideBar YinYing" :class="stores.showAddon?'Addon':''">
        <div class="SideBar-list" :class="stores.showAddon?'SideBar-list2':''">
        <button class="dButton" @click="stores.changet()">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><path d="M19,8H5A1,1,0,0,1,5,6H19a1,1,0,0,1,0,2Z" :fill="color"/><path d="M19,13H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" :fill="color"/><path d="M19,18H5a1,1,0,0,1,0-2H19a1,1,0,0,1,0,2Z" :fill="color"/></svg>
        </button>
        <span class="SideBar-span" :style="{opacity:stores.showAddon?1:0}">列表</span>
        </div>
        <div class="SideBar-list" :class="stores.showAddon?'SideBar-list2':''">
            <User/>
            <span class="SideBar-span" :style="{opacity:stores.showAddon?1:0}">用户</span>
        </div>
    </div>
</template>
<style scoped>
.Addon{
    width:200px
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
    opacity:0.9;
    overflow: hidden;
    align-items: center;
    display: flex;
    flex:1;
    flex-direction: column;
    text-align:center;
    margin: 0;
    height: 98vh;
    padding-bottom: 2vh;
    background-color: #2C2C2CFF;
    transition: 0.5s;
    width: 80px;
    
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
    color:#eee;
    line-height:80px;
    font-size: 55px;
    position: absolute;
    white-space:nowrap;
    margin-left: 5vw;
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