<script setup lang="ts">
import {ref} from 'vue';
import Nav from './vue/Nav.vue'
import SideBar from './vue/SideBar.vue'
interface Page{
    readonly name:String,
    readonly url:String
}
const PageList=ref([
    {
        name:"主页",
        url:"#app"
    }
]);
</script>
<template>
    <header class="YinYing flex">
        <SideBar/>
        <Nav v-bind:PageList="PageList"/>
    </header>
</template>
<style scoped>
header{
    width: 100vw;
    height: 100vh;
    margin:4px;
    background-color: #eee;
}
.flex{
    display: flex;
}
.YinYing{
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
</style>
