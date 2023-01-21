<script setup lang="ts">
import { ref } from 'vue';
import Modal from './Modal.vue'
import { loginStore } from '@/vue/stores/loginStore'
import type { Ref } from 'vue'
import LogIn from './ModalPages/LogIn.vue';
import SignUp from './ModalPages/SignUp.vue';
import Nor from './ModalPages/Nor.vue'
import { ModalStore } from '../stores/Modal';
const store2=ModalStore();
const color:Ref<string>=ref('gray');
const showUi:Ref<boolean>=ref(false);
const store = loginStore();
const showclose:Ref<boolean>=ref(false);
const page:Ref<unknown>=ref(Nor);
function signupC(evenr:Event){
    if(page.value==SignUp) page.value=Nor;
    else page.value=SignUp;
    let w=store2.getS;
    if(w!=undefined){
        store2.cgetN(w);
    }
}
function loginC(event:Event){
    if(page.value==LogIn) page.value=Nor;
    else page.value=LogIn;
    let w=store2.getL;
    if(w!=undefined){
        store2.cgetN(w);
    }
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
                        <component :is="page"/>
                    </KeepAlive>
                </div>
                <div v-else>
                    <button class="button2" @click="store.ChangeLoginState(0)">退出</button>
                </div>
            </template>
            <template #footer>
                <div>
                <button class="button2" @click="store2.now" v-if="page!=Nor"><span>提交</span></button>
                <button @click="showUi=!showUi" class="right">关闭</button>
                </div>
            </template>
        </Modal>
    </Teleport>
</template>
<style scoped>
.flex1{
    flex-direction: row;
}
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
    background-color: rgba(255,255,255,0.3);
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
    width: 100px;
    height: 40px;
    font-size: 20px;
}
.right{
    vertical-align:middle;
    width: 100px;
    height: 40px;
    font-size: 20px;
    float:right;
}
.flex{
    display: flex;
    overflow: hidden;
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
    float: right;
    border: none;
    background-color:rgba(0,0,0,0);
    color:gray;
    font-size: auto;
    width: 80px;
    height: 80px;
    padding: 0vw 10px;
    margin-left: -0.1vw;
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