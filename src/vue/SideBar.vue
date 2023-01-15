<script setup lang="ts">
import User from './Struct/User.vue';
</script>

<template>
    <div class="SideBar YinYing">
        <User/>
    </div>
</template>
<style scoped>
.SideBar{
    overflow: hidden;
    align-items: center;
    display: flex;
    flex:1;
    flex-direction: column-reverse;
    text-align:center;
    margin: 0;
    width: 5vw;
    height: 98vh;
    padding-bottom: 2vh;
    background-color: #2C2C2CFF;
}
.YinYing{
      box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
        rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
</style>