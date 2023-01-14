<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue'

const color=ref('gray');
const showUi=ref(false);

</script>
<template>
    <button class="SignUpButton" @mouseleave="color='gray'" @mouseenter="color='white'" @click="showUi=!showUi">
        <svg enable-background="new 0 0 32 32" id="Stock_cut" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><desc/><g><circle cx="16" cy="16" fill="none" r="15" :stroke="color" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><path d="M26,27L26,27   c0-5.523-4.477-10-10-10h0c-5.523,0-10,4.477-10,10v0" fill="none" :stroke="color" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><circle cx="16" cy="11" fill="none" r="6" :stroke="color" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></g></svg>
    </button>
    <Teleport to="body">
        <Modal :show="showUi" @close="showUi=!showUi">
            <template #header>
                <h1 class="Text1">用户</h1>
            </template>
            <template #body>
                <h3>你还未注册</h3>
            </template>
        </Modal>
    </Teleport>
</template>
<style scoped>
.Text1{
    margin-top: 0;
    color: rgb(23, 114, 180);
}
.YinYing{
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
.SignUpButton{
    border: none;
    background-color:#2C2C2CFF;
    color:gray;
    font-size: auto;
    width: 5vw;
    height: 5vw;
    padding: 1vw 1vw;
}
.SignUpButton:hover{
    color: white;
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
</style>