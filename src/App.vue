<script setup lang="ts">
import SideBar from './vue/SideBar.vue'
</script>
<template>
    <header>
        <el-container>
            <SideBar/>

            <el-main class="e">
                <KeepAlive>
                    <RouterView/>
                </KeepAlive>
           </el-main>
        </el-container>
    </header>
</template>
<style>
.e{
left:0;
margin-left:0;
height: 100%;
    width: 100%;
min-width:calc(100vw - 120px);
position:relative;
}
</style>
