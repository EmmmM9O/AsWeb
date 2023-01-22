<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import MapAdd from '../Struct/MapAdd.vue';
import {mapStore} from '@/vue/stores/map';
import configs from '@/config';
import Modal from '../Struct/Modal.vue';
const stores=mapStore();
const ser=ref('');
const text=ref('');
async function Update(){
    let wa=ser.value.length<=0 ? configs.host+'/api/map/getMap/PageAll' : configs.host+'/api/map/getMap/PageName';
    await axios.post(wa,{
        page:stores.page,
        pageSize:stores.pageSize,
        sea:ser.value
    }).then(res=>{
        if(res.data.state!=1){
            text.value=res.data.erron;
            return ;
        }
        stores.changeMap(JSON.parse(JSON.stringify(res.data.result)));
        text.value="刷新成功";
    }).catch(err=>{
        text.value=err;
    })
}
Update();
function remove(){
    stores.changePage(Math.max(stores.page-1,1));
    Update();
}
function add() {
    if(stores.maps.length<stores.pageSize){
        return ;
    }
    stores.changePage(stores.page++);
    Update();
}

</script>
<template>
    <div class="flex flex1 coflex s" >
        <div class="top flex YinYing">
            <input placeholder="搜索" v-model="ser" class="InputK df def" @change="Update()"/>
            <button @click="Update()" class="ButtonK">刷新</button>
            <MapAdd/>
        </div>
        <div class="flex data">
        <div v-for="item in stores.maps">
            <div class="Map YinYing" @click="stores.turn();stores.cho(item)">
                <div class="mapTop">
                {{item.id+':'+item.name }}
                </div>
                <div class="MapIcon">
                    <img :src="configs.host+'/api/map/getPng/'+item.id" class="ico"/>
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
            <button class="ButtonK buf2">{{ stores.page }}</button>
            <button class="ButtonK buf2" @click="add()">{{ '>' }}</button>
            </div>
        </div>
    </div>
    <Teleport to="body">
        <Modal :show="stores.show" :showclose="false" @close="stores.turn()" v-if="stores.mapNow!=null">
            <template #header>
                <h1>{{ stores.mapNow==null?'none':stores.mapNow.id}}地图:{{ stores.mapNow==null?'none':stores.mapNow.name}}</h1>
                <h4>作者:{{ stores.mapNow==null?'none':stores.mapNow.another}}::上传者:{{ stores.mapNow==null?'none':stores.mapNow.upload}}</h4>
            </template>
            <template #body>
                <img :src="stores.mapNow==null?'none':configs.host+'/api/map/getPng/'+ String(stores.mapNow.id)" class="ico2"/>
            </template>
            <template #footer>
                <div class="fsa">
                    <a class="ButtonK" :href="configs.host+'/api/map/getMap/ById/'+String(stores.mapNow.id)">下载</a>
                    <button class="ButtonK" @click="stores.turn()">取消</button>
                </div>
            </template>
        </Modal>
    </Teleport>
</template>
<style scoped>
@import '@/assets/Input.css';
.fsa{
    display: flex;
    justify-content: space-around;
}
.ico2{
    width: 20vw;
    height: 20vw;
}
.ico{
    margin-left: 20px;
    margin-right: 20px;
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
    background-color: #eee;
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
    border : 2px solid #eee;
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
    width: calc(100% - 20px);
    padding: 20px 0px;
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
