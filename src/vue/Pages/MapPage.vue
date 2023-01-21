<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import type { Ref } from 'vue';
import MapAdd from '../Struct/MapAdd.vue';
const ser=ref('');
const page=ref(1);
const PageE=ref(6);
const text=ref('');
interface Map{
    id:number,
    name:string,
    upload:string,
    decs:string,
    MapPath:string,
    another:string
}
const ths:Ref<Array<Map>>=ref([]);
async function Update(){
    await axios.post('http://localhost:3000/api/map/getMap/PageAll',{
        page:page.value,
        pageSize:PageE.value
    }).then(res=>{
        if(res.data.state!=1){
            text.value=res.data.erron;
            return ;
        }
        ths.value=JSON.parse(JSON.stringify(res.data.result));
        text.value="刷新成功";
    }).catch(err=>{
        text.value=err;
    })
}
Update();
</script>
<template>
    <div class="flex flex1 coflex" >
        <div class="top flex">
            <input placeholder="搜索" v-model="ser" class="InputK df def"/>
            <MapAdd/>
        </div>
        <div class="line"></div>
        <div class="flex data">
        <div v-for="item in ths">
            <div class="Map">{{item.id+':'+item.name }}</div>
        </div>
        </div>
        <div class="footer">
            <div class="con">
            <button class="ButtonK Buf" @click="page=Math.max(page-1,1)">{{ '<' }}</button>
            <button class="ButtonK Buf">{{ page }}</button>
            <button class="ButtonK Buf" @click="page++">{{ '>' }}</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import '@/assets/Input.css';
.line{
    width: 100%;
    height: 6px;
    flex-basis: 6px;
}
.con{
    display: flex;
    width: 150px;
    background-color: white;
    height: 100px;
}
.footer{
    margin-bottom: 20px;
    align-self:flex-end;
    margin:6px;
    height: 50px;
    width: 100%;
    z-index: 9980;
    flex:1;
    line-height: 50px;
}
.Map{
    width: 100px;
    height: 100px;
    margin: 4px;
    background-color: white;
    border-radius: 6px;
}
.Buf{
    width: 50px;
    height: 50px;
    background-color: white;
}
.df{
    width: 350px;
    height: 50px;
    background-color: white;
    z-index: 9980;
}
.def{
    margin-left: 6px;
    margin-right: 6px;
}
.top{
    flex:1;
    justify-content:space-between;
    z-index: 9980;
    width: 100%;
    height: 50px;
    margin:6px;
}
.data{
    flex:1;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: calc(100vh - 242px);
    margin: 6px;
    flex-basis:calc(100vh - 242px);
}
</style>
