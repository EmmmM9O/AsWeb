<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import axios from 'axios'
import { loginStore } from "@/vue/stores/loginStore";
import { ModalStore } from "@/vue/stores/Modal";
const store=loginStore();
const passwordReg =/^[0-9A-Za-z]{4,15}$/;
const name:Ref<string>=ref("");
const password:Ref<string>=ref("");
const text:Ref<string>=ref("");
const store2=ModalStore();
store2.cgetL(login);
store2.cgetN(login);
async function login(){
    if(!passwordReg.test(password.value)){
        text.value='密码格式错误';
    }
    await axios.post('http://localhost:3000/api/user/login',{
        'name':name.value,
        'password':password.value
    }).then(result=>{
        console.log(result);
        if(result.data.state!=1||result.data.erron!=null){
            text.value=result.data.erron;
        }
        else{
            text.value='登录成功'+result;
            console.log(result);
            store.ChangeLoginState(1);
            store.ChangeName(result.data.result.name);
            store.ChangeToken(result.data.token);
        }

    }).catch(e=>{
        text.value=e;
    })
}


</script>
<template>
    <div class="flex">
        <input class="InputK" v-model="name" placeholder="名字"/>
        <input class="InputK" v-model="password" placeholder="密码" :class="passwordReg.test(password)?'':'erron'"/>
        <h4>{{ text }}</h4>
    </div>
</template>
<style scoped>
@import '@/assets/Input.css';
.flex{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}
</style>
