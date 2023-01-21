<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import type { Ref } from 'vue';
import MapAdd from '../Struct/MapAdd.vue';
const ser=ref('');
const page=ref(1);
const PageE=ref(12);
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
function remove(){
    page.value=Math.max(page.value-1,1);
    Update();
}
function add() {
    if(ths.value.length<PageE.value){
        return ;
    }
    page.value++;
    Update();
}
</script>
<template>
    <div class="flex flex1 coflex s" >
        <div class="top flex YinYing">
            <input placeholder="搜索" v-model="ser" class="InputK df def"/>
            <MapAdd/>
        </div>
        <div class="line"></div>
        <div class="flex data">
        <div v-for="item in ths">
            <div class="Map YinYing">
                <div class="mapTop">
                {{item.id+':'+item.name }}
                </div>
                <div class="MapIcon">
                    <img :src="'http://localhost:3000/api/map/getPng/'+item.id" class="ico"/>
                </div>
                <div class="mapTop">
                    {{ '上传者'+item.upload }}
                </div>
            </div>
        </div>
        </div>
        <div class="footer">
            <div class="con">
            <button class="ButtonK buf2" @click="remove()">{{ '<' }}</button>
            <button class="ButtonK buf2">{{ page }}</button>
            <button class="ButtonK buf2" @click="add()">{{ '>' }}</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import '@/assets/Input.css';
.ico{
    width: 120px;
    height: 120px;
}
.s{
    width: 100%;
    height: 100%;
}
.MapIcon{
    flex:0;
    height: 120px;
    width: 120px;
}
.mapTop{
    flex:0;
    height: 20px;
    width: 100%;
    font-size: 16px;
    line-height: 20px;
}
.line{
    width: 100%;
    height: 6px;
    flex-basis: 6px;
    background-color: gray;
}
.con{
    display: flex;
    width: 150px;
    background-color: white;
    justify-content: center;
    height: 40px;
    flex:0;
}
.footer{
    margin-bottom: 30px;
    align-self:flex-end;
    margin:6px;
    height: 40px;
    width: 100%;
    z-index: 9980;
    flex:0;
    line-height: 40px;
    display: flex;
    justify-content: center;

}
.Map{
    width: 160px;
    height: 160px;
    margin: 6px;
    background-color: white;
    border-radius: 16px;
    display:flex;
    flex-wrap: wrap;
    flex-direction: column;
    flex:0;
    box-sizing: border-box ;
}
.buf2{
    width: 40px;
    height: 40px;
    background-color: white;

}
.Buf{
    width: 50px;
    height: 50px;
    background-color:white;
}
.df{
    width: 400px;
    height: 40px;
    background-color: white;
    z-index: 9980;
    border-radius: 12px;
    border : 2px solid gray;
}
.def{
    margin-left: 6px;
    margin-right: 6px;
}
.top{
    background-color: white;
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
    align-content: flex-start;
    margin: -4px;
    box-sizing: border-box ;
}
</style>
