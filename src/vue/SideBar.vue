<script setup lang="ts">
import User from './Struct/User.vue';
import {reactive, ref} from 'vue';
import { SideBarStore } from './stores/sidebar';
import type { Ref } from 'vue';
import font from '@/assets/fonts/Os.ttf'
import { useRouter, type RouteRecordRaw } from 'vue-router';
import github from './Icons/github.vue';
import qq from './Icons/qq.vue';
import mdt from '@/assets/icon.png'
const stores = SideBarStore();
const color:Ref<string> =ref('gray');
const fo=reactive({
    fontFamily: 'Os',
    src: 'url('+font+')'
})
const router=useRouter();
var temp:Array<RouteRecordRaw> =[];
for(let i of router.options.routes){
    if(i.meta?.show){
        temp.push(i);
    }}

</script>
<template>
    <div class="SideBar" :class="stores.showAddon?'Addon':'Addon2'">
        <div>
        <div class="line2">
            <div class="yuan red"></div>
            <div class="yuan blue"></div>
            <div class="yuan green" ></div>
        </div>
        <div class="SideBar-list" :class="stores.showAddon?'SideBar-list2':''" @click="stores.changet()"> 
        <button class="dButton">
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
        <div>
        <div class="line"></div>
            <div class="flex" v-for="item in temp">
            <router-link v-bind:to="item.path" class="SideBar-list g" :class="[item.path==$route.path?'SideBar-h':'',stores.showAddon?'SideBar-list2':'']">
                <button class="dButton">
                    <component :is="item.meta?.icon"/>
                </button>
                <span class="SideBar-span" :class="fo" :style="{opacity:stores.showAddon?1:0}">{{ item.name }}</span>
            </router-link>
            </div>
        </div>
        <div class="list">
            <div class="SideBar-list" :class="stores.showAddon?'SideBar-list2':''">
                <a class="dButton" href="https://github.com/EmmmM9O/asweb">
                    <github/>
                </a>
                <span class="SideBar-span s2" :class="fo" :style="{opacity:stores.showAddon?1:0}">github</span>
            </div>
            <div class="SideBar-list" :class="stores.showAddon?'SideBar-list2':''">
                <a class="dButton" href="ohno">
                    <qq/>
                </a>
                <span class="SideBar-span" :class="fo" :style="{opacity:stores.showAddon?1:0}">QQ</span>
            </div>
            <div class="SideBar-list" :class="stores.showAddon?'SideBar-list2':''">
                <div class="dButton">
                <img :src="'url('+mdt+')'" width="50" height="50"/>
                </div>
                <span class="SideBar-span s2" :class="fo" :style="{opacity:stores.showAddon?1:0}">mindustry</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import '@/assets/Input.css';
@import '@/assets/colorful.css';
.s2{
    font-size: 25px;
}
.red{
    background-color: red;
}
.green{
    background-color: greenyellow;
}
.blue{
    background-color: skyblue;
}
.yuan{
    margin-left: 3px;
    border-radius:50%;
    height: 8px;
    width: 8px;
}
.g{
    margin: 0px;
}
.list{
    justify-content: flex-end;
    display: flex;
    flex-direction: column;
    flex:0;
    height: auto;
    width: 100%;
}
.Addon2{
    width: 50px;
}
.Addon{
    width:150px
}
.line2{
    float: left;
    width:100%;
    height: 8px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center
}
.line{
    width: 100%;
    height: 4px;
    margin-top: 2px;
    margin-bottom: 2px;
    background-color: rgba(0,0,0,0.6);
    opacity: 1;
}
.dButton{
    background-color: rgba(0, 0, 0, 0);
    float: left;
    border: none;
    width: 50px;
    height: 50px;
    padding: 0px 0px;
}
.SideBar{
    left:0;
    top:0;
    position: fixed;
    backdrop-filter: blur(18px);
    border-radius: 18px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    overflow: hidden;
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    text-align:center;
    margin: 0;
    height: 100vh;
    padding-bottom: 0vh;
    transition: 0.5s;
    opacity:0.6;
    background-color: rgba(0,0,0,0.7);
    justify-content:space-between;
}
.SideBar-list{
    display: inline-flex;
    flex-wrap: nowrap;
    flex-direction: row;
    width: 100%;
    height: 50px;
    margin-top: 0px;
    transition: 0.5s;
    flex:0;
}

.SideBar-span{
    color:white;
    line-height:50px;
    font-size: 45px;
    position: absolute;
    white-space:nowrap;
    margin-left:55px;
    transition: 0.5s;
    opacity: 0;
}
.SideBar-list2{
    width: 150px;
}
.SideBar-h{
    width: 100%;
    margin-left: 0px;
    left:-6px;
    border-left: 6px solid white;
    background-color: rgba(255, 255, 255, 0.2);
}
.SideBar-list:hover{

    margin-left: 0px;
    left:-6px;
    border-left: 6px solid white;
    background-color: rgba(255, 255, 255, 0.2);
}

.YinYing{
      box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
        rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
</style>