<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue'
import { loginStore } from '@/vue/stores/loginStore'
import type { Ref } from 'vue'
import LogIn from './ModalPages/LogIn.vue';
import SignUp from './ModalPages/SignUp.vue';
import Nor from './ModalPages/Nor.vue'
const color:Ref<string>=ref('gray');
const showUi:Ref<boolean>=ref(false);
const store = loginStore();
const showclose:Ref<boolean>=ref(false);
const page:Ref<unknown>=ref(Nor);
function signupC(evenr:Event){
    if(page.value==SignUp) page.value=Nor;
    else page.value=SignUp;
}
function loginC(event:Event){
    if(page.value==LogIn) page.value=Nor;
    else page.value=LogIn;
}
</script>
<template>
    <button class="SignUpButton" @mouseleave="color='gray'" @mouseenter="color='white'" @click="showUi=!showUi">
        <svg enable-background="new 0 0 32 32" id="Stock_cut" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><desc/><g><circle cx="16" cy="16" fill="none" r="15" :stroke="color" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><path d="M26,27L26,27   c0-5.523-4.477-10-10-10h0c-5.523,0-10,4.477-10,10v0" fill="none" :stroke="color" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/><circle cx="16" cy="11" fill="none" r="6" :stroke="color" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/></g></svg>
    </button>
    <Teleport to="body">
        <Modal :show="showUi" :showclose="showclose" @close="showUi=!showUi">
            <template #header>
                <h1 class="Text1">用户:{{ store.UserName }}</h1>
            </template>
            <template #body>
                <div v-if="store.LoginState!=1">
                    <h3>你还未登录</h3>
                    <div class="flex">
                        <button class="button2" @click="loginC"><span>登录</span></button>
                        <button class="button2" @click="signupC"><span>注册</span></button>
                    </div>
                    <KeepAlive>
                        <component :is="page" />
                    </KeepAlive>
                </div>
            </template>
            <template #footer>
                <button @click="showUi=!showUi" class="right">关闭</button>
            </template>
        </Modal>
    </Teleport>
</template>
<style scoped>
.button2 span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
}
.button2 span::after{
    content: '\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
}
.button2{
    transition: all 0.5s;
    cursor: pointer;
}
.button2:hover span {
    padding-right: 25px;
}
.button2:hover span:after {
    opacity: 1;
    right: 0;
}
.button2{
    vertical-align:middle
}
.right{
    vertical-align:middle;
}
.flex{
    display: flex;
    flex:2;
    overflow: hidden;
    flex-direction: column;
}
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

button{
    margin: 3px;
    font-size: larger;
    background-color:#eee;
    color: black;
    border: 2px solid #eee;
}
button:hover{
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
</style>