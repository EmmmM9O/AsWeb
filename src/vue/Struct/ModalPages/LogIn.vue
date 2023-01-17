<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import axios from 'axios'
import { loginStore } from "@/vue/stores/loginStore";
const store=loginStore();
const passwordReg =/^[0-9A-Za-z]{4,15}$/;
const name:Ref<string>=ref("");
const password:Ref<string>=ref("");
const text:Ref<string>=ref("");
const emit=defineEmits<{
    (e: 'getRun', id: ()=>Promise<void>): void
}>();
async function login(){
    await axios.post('http://localhost:3000/api/user/login',{
        'name':name.value,
        'password':password.value
    }).then(result=>{
        if(result.data.state!=1){
            text.value="登录出错";
        }
        else{
            text.value='登录成功';
            store.ChangeLoginState(1);
            store.ChangeName(result.data.result.name);
            store.ChangeToken(result.data.token);
        }

    }).catch(e=>{
        text.value=e;
    })
}
emit('getRun',login)

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
