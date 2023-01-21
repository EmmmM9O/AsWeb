<script setup lang="ts">
import SideBar from './vue/SideBar.vue'
import background from '@/assets/background.jpg'
import { reactive } from 'vue';
import { SideBarStore } from './vue/stores/sidebar';
const store=SideBarStore();
const b=reactive({
    background:'url('+background+') no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundAttachment:'fixed'
})
</script>
<template>
    <header class="flex H" :style="b">
        <SideBar/>
        <div className='other' :class="store.showAddon?'l1':'l2'">
            <KeepAlive>
                <RouterView/>
            </KeepAlive>
        </div>
    </header>
</template>
<style scoped>
.H{
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
    width: calc(100vw - 200px);

}
.l2{
    width: calc(100vw - 80px);
}
.other{
    height: calc(100vh - 80px);
  display:flex;
  flex:1;
  flex-direction: column;
}
</style>
