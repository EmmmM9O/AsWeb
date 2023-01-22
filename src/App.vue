<script setup lang="ts">
import SideBar from './vue/SideBar.vue'
import background from '@/assets/background.jpg'
import { reactive } from 'vue';
import { SideBarStore } from './vue/stores/sidebar';
const store=SideBarStore();
const b=reactive({
    
})
</script>
<template>
    <header class="flex H" :style="b">
        <SideBar/>
        <div class='other' :class="store.showAddon?'l1':'l2'">
            <KeepAlive>
                <RouterView/>
            </KeepAlive>
        </div>
    </header>
</template>
<style scoped>
.H{
    background: #eee;
    overflow: hidden;
    width: 100%;
    height: 100%;
    position:fixed;
    background-size: cover;
    background-repeat:no-repeat;
    margin:0px;
    background-attachment:fixed;
}
.H2{
z-index:1;
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
}
.flex{
    display: flex;
}
.YinYing{
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
.l1{
    width: calc(100vw - 150px);
    margin-left: 150px;
    left: 150px;
}
.l2{
    width: calc(100vw - 50px);
    margin-left: 50px;
    left: 50px;
}
.other{
    transition: 0.5s;
    height: 100vh;
  display:flex;

  flex-direction: column;
}
</style>
