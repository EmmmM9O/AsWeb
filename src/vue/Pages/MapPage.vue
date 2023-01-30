<script setup lang="ts">
import { Search,Plus } from '@element-plus/icons-vue';
import {ref} from 'vue';
import Tags from '@/vue/Struct/Tags.vue';
import MapAdd from '../Struct/MapAdd.vue';
const sea=ref('');
const showUi=ref(false);
const seaF=ref(['名字','作者','简介'])
const seaN=ref(['名字']);
const tags = ref<string[]>([]);
</script>
<template>
    <el-container>
      <el-header class="top">
         <el-input
            v-model="sea"
            placeholder="Please input"
            class="input-with-select"      
         >
         <template #prepend>
            <el-checkbox-group v-model="seaN">
               <el-checkbox-button v-for="it in seaF" :key="it" :label="it">
                  {{ it }}
               </el-checkbox-button>
            </el-checkbox-group>
         </template>
         <template #append>
            <el-button-group>
            <el-button :icon="Search"/>
            <el-button type="primary" :icon="Plus" circle @click="showUi=!showUi"/>
            </el-button-group>
         </template>
         </el-input>
            <Tags :tag="tags" @update="(val)=>{tags=val}" class="input-with-select"/>
      </el-header>
      <el-main>
      </el-main>
    </el-container>
    <MapAdd :show="showUi" @change="showUi=!showUi"/>
</template>
<style>
.input-with-select {
   background-color: var(--el-fill-color-blank);
   width:90%;
}
</style>
