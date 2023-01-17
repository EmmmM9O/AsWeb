<script setup lang="ts">
import {ref,onUnmounted} from 'vue';
import type {Ref} from 'vue';
import axios from 'axios'
const mail:Ref<string>=ref("");
const name:Ref<string>=ref("");
const password1:Ref<string>=ref("");
const password2:Ref<string>=ref("");
const vccode:Ref<string>=ref("");
const passwordReg =/^[0-9A-Za-z]{4,15}$/;
const mailReg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
const vccodeReg=/^[1-9]*$/;
const token:Ref<string>=ref('');
const text:Ref<string>=ref('');
const buttonT:Ref<string> =ref('发送');
const emit=defineEmits<{
    (e: 'getRun', id: ()=>Promise<void>): void
}>();
let time=setInterval(()=>{
    if(buttonT.value!='发送'){
        let sum=Number(buttonT.value);
        if(sum==null||isNaN(sum)||sum<=0){
            buttonT.value='发送';
            return ;
        }
        buttonT.value=String(sum-1);
    }
},1000);
onUnmounted(()=>{clearInterval(time)});
async function vccodF() {
    if(token.value.length<=0){
        text.value='还未发送';
        return ;
    }
    if(!vccodeReg.test(vccode.value)){
        text.value='验证码格式错误';
        return ;
    }
    await axios.post('http://localhost:3000/api/user/vccode',{
        'token':token.value,
        'vccode':vccode.value
    })
}
async function signup(){
    if(buttonT.value!='发送'){
        text.value='倒计时中';
        return ;
    }
    if(!mailReg.test(mail.value)){
        text.value='邮箱格式错误';
        return ;
    }
    if(!passwordReg.test(password1.value)){
        text.value="密码格式错误"
        return ;
    }
    if(password1.value!=password2.value){
        text.value='密码不相同!';
        return ;
    }
    await axios.post('http://localhost:3000/api/user/signup',{
        'mail':mail.value,
        'password':password1.value,
        'name':name.value
    }).then(res=>{
        if(typeof res.data.token==='string'){
            token.value=res.data.token;
            buttonT.value='60';
        }else{
            text.value="登录失败";
        }
    }).catch(err=>{
        text.value=err;
    })
}
emit('getRun',vccodF);
</script>
<template>
    <div class="flex coflex">
        <input class="InputK" v-model="mail" placeholder="邮箱" :class="mailReg.test(mail)||mail.length<=0?'':'erron'"/>
        <input class="InputK" v-model="name" placeholder="名字"/>
        <input class="InputK" v-model="password1" placeholder="密码" :class="password1.length<=0||passwordReg.test(password1)?'':'erron'"/>
        <input class="InputK" v-model="password2" placeholder="再输入一遍密码" :class="passwordReg.test(password1)&&password1!=password2?'erron':''"/>
        <div class="flex flex1">
            <input class="InputK in" v-model="vccode" placeholder="验证码" :class="vccodeReg.test(vccode)||vccode.length<=0?'':'erron'"/>
            <button class="ButtonK" @click="signup"><span>{{ buttonT }}</span></button>
        </div>
    </div>
</template>
<style scoped>
@import '@/assets/Input.css';
.in{
    width: calc(30vw - 100px);
}
</style>