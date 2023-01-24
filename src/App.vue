<script setup lang="ts">
import SideBar from './vue/SideBar.vue'
</script>
<template>
    <header>
        <el-container>
            <SideBar/>
            <el-main>
                <KeepAlive>
                    <RouterView/>
                </KeepAlive>
            </el-main>
        </el-container>
    </header>
</template>

