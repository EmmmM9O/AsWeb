<script setup lang="ts">

import {ref} from 'vue';
import type { Ref } from 'vue';
import { loginStore } from '../stores/loginStore';
import Modal from './Modal.vue';
import axios from 'axios';
const color:Ref<string>=ref('black');
const showT:Ref<boolean>=ref(false);
const showclose:Ref<boolean>=ref(false);
const store=loginStore();
const name=ref(store.UserName);
const another=ref('');
const decs=ref('');
const text=ref('');
/*
const files:Ref<FileList>=ref(new FileList);
function onC(event:Event){
    let f=(event.target as HTMLInputElement).files;
    if(f instanceof FileList){
        files.value=f;
    }
}
function up(){
    if(files.value.length<1){
        text.value="你文件呢";
        return;
    }
    let file=files.value[0];
    let formData=new FormData();
    formData.append('user',file);
    formData.append('name',name.value);
    formData.append('another',another.value);
    formData.append('decs',decs.value);
    if(store.token==null) return ;
    formData.append('token',store.token);
    axios.post('http://localhost:3000/api/map/upload',formData,{
        headers:{
            "Content-type":"multipart/form-data"
        }
    }).then(r=>{
        if(r.data.state!=1){
            text.value=r.data.erron;
        }else{
            text.value='成功';
            showT.value=false;
        }
    });
    
}
*/
</script>
<template>
    <button class="Icon YinYing ic" @click="showT=!showT">
        <!--
        <svg width="50px" height="50px" viewBox="0 0 24 24" :fill="color" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10H5C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14H10V19C10 20.1046 10.8954 21 12 21C13.1046 21 14 20.1046 14 19V14H19C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10L14 10V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V10" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    -->
    +
    </button>
    <Teleport to="body">
        <Modal :show="showT" :showclose="showclose" @close="showT=!showT">
            <template #header>
                <h1>地图上传</h1>
            </template>
            <template #body>
                <div class="flex flex1 coflex">
                    <div class="flex flex1">
                        <input class="InputK def" v-model="name" placeholder="名字"/>
                        <input class="InputK def" v-model="another" placeholder="作者"/>
                    </div>
                    <input class="InputK def2" v-model="decs" placeholder="简介"/>
                    <input type="file"/>
                    {{ text }}
                </div>
            </template>
            <template #footer>
                <div>
                <button class="ButtonK">提交</button>
                <button @click="showT=!showT" class="ButtonK">关闭</button>
                </div>
            </template>
        </Modal>
    </Teleport>
</template>
<style scoped>
@import "@/assets/Input.css";
.ic2{
    z-index: 9980;
}
.ic{
    overflow: hidden;
    line-height: 50px;
    font-size: 45px;
    z-index: 9980;
}
.ri{
    float: right;
}
.def{
    width: 50%;
}
.def2{
    height: 100px;
}
</style>
