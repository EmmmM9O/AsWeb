<script setup lang="ts">
import { ArrowUpBold ,ArrowDownBold,Notification,InfoFilled} from '@element-plus/icons-vue';
import {ref} from 'vue';
import p1 from '@/assets/1.png';
import p2 from '@/assets/2.png';
import p3 from '@/assets/3.png';
import LogIn from '../Struct/LogIn.vue';
import LogOn from '../Struct/LogOn.vue';
const LogInShow=ref(false);
const LogOnShow=ref(false);

const activeName=ref('1')
const Imgs=[
    p1,p2,p3
] as Array<unknown>
</script>
<template>
            <el-carousel :interval="4000" type="card" class="s">
                <el-carousel-item v-for="(value, key) in Imgs" :key="key">
                    <div justify="center">
                        <el-image style="width: 400px; height: 300px" :src="value" fit="cover" />
                    </div>
                </el-carousel-item>
            </el-carousel>
            <div class="main">
            <div width="100%">
                <div class="e">
           <el-button type="success" @click="LogInShow=!LogInShow">
                登录<el-icon><ArrowUpBold /></el-icon>
            </el-button>
            <el-button type="success" @click="LogOnShow=!LogOnShow">
                注册<el-icon><ArrowDownBold /></el-icon>
            </el-button>
        </div >
            </div>
                <el-collapse v-model="activeName" accordion class="list c">
                    <el-collapse-item name="1">
                        <template #title>
                            公告<el-icon><Notification /></el-icon>
                        </template>
                        禁止涩涩
                    </el-collapse-item>
                    <el-collapse-item name="2">
                        <template #title>
                            关于AS地图站<el-icon><InfoFilled /></el-icon>
                        </template>
                        AS地图站是由emmmPad使用Vue+Typescript制作的
                    </el-collapse-item>
                </el-collapse>
             </div>
    <LogOn :show="LogOnShow" @change="LogOnShow=!LogOnShow"/>
    <LogIn :show="LogInShow" @change="LogInShow=!LogInShow"/>
</template>

<style>
.e{
    margin: 0 auto;
}
.c{
	min-width: calc(100vw - 320px);
}
.s{
    min-width: calc(100vw - 160px);
	height:300px
}
.top{
    height: 300px;
}
.main{
    border-radius: 12px;
    width: 100%;
    height: 100%;
}
.left{
    height: 100%;
    width: 100%;
    margin-left:0;
    left:0;
}

</style>
