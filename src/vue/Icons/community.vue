<script setup lang="ts">
import { ref } from 'vue';
const color=ref('gray')

</script>
<template>
    <div class="d" @mouseenter="color='white'" @mousemove="color='gray'">
        <svg id="Layer_1_1_" :fill="color" style="enable-background:new 0 0 16 16;" version="1.1" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M14,0H2C0.895,0,0,0.895,0,2v9c0,1.105,0.895,2,2,2h2.057L2,16l6-3h6c1.105,0,2-0.895,2-2V2C16,0.895,15.105,0,14,0z M13,10  H3V9h10V10z M13,7H3V6h10V7z M13,4H3V3h10V4z"/></svg>
    </div>
</template>
<style>
.d{
    width: 50px;
    height: 50px;
}
</style>