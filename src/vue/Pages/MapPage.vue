<script setup lang="ts">
import { ref } from 'vue';
import MapAdd from '../Struct/MapAdd.vue';
const ser=ref('');
</script>
<template>
    <div class="flex flex1 coflex" >
        <div class="top">
            <input placeholder="搜索" v-model="ser" class="InputK df def"/>
            <MapAdd class="def"/>
        </div>
    </div>
</template>

<style scoped>
@import '@/assets/Input.css';
.df{
    background-color: white;
    z-index: 9980;
}
.def{
    margin: 6px;
}
.top{ 
    z-index: 9980;
    width: 100%;
    height: 80px;
}
</style>
