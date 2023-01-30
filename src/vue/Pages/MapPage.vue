<script setup lang="ts">
import { Search,Plus,Download,InfoFilled} from '@element-plus/icons-vue';
import {ref} from 'vue';
import Tags from '@/vue/Struct/Tags.vue';
import MapAdd from '../Struct/MapAdd.vue';
import UserStore from '../Stores/User';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import config from '@/config';
interface map{
   name:string,another:string,decs:string,upload:string,id:number
}
const maps=ref<Array<map>>([]);
const pageNow=ref(1);
const pageSize=ref(10);
const userStore=UserStore();
const sea=ref('');
const showUi=ref(false);
const seaF=ref(['名字','作者','简介'])
const seaN=ref(['名字']);
const tags = ref<string[]>([]);
function click(){
   if(userStore.state!=1){
      ElMessage.error('你还未登入');
      return ;
   }
   showUi.value=!showUi.value;
}
function update(){
   axios.post(config.host+'/api/map/getMap/PageAll',{
      "page":pageNow.value,
      "pageSize":pageSize.value,
      "sea":sea.value,
      "seaN":seaN.value
   }).then(res=>{
      if(res.data.state!=1){
         ElMessage.error(res.data.erron);
         return ;
      }
      maps.value=JSON.parse(JSON.stringify(res.data.result));
   })
   .catch(err=>{
      ElMessage.error(err);
   })
}
</script>
<template>
    <el-container>
      <el-header class="top">
         <el-input
            v-model="sea"
            placeholder="Please input"
            class="input-with-select"      
         >
         <template #prepend>
            <el-checkbox-group v-model="seaN">
               <el-checkbox-button v-for="it in seaF" :key="it" :label="it">
                  {{ it }}
               </el-checkbox-button>
            </el-checkbox-group>
         </template>
         <template #append>
            <el-button-group>
            <el-button :icon="Search"/>
            <el-button type="primary" :icon="Plus" circle @click="click()"/>
            </el-button-group>
         </template>
         </el-input>
            <Tags :tag="tags" @update="(val)=>{tags=val}" class="input-with-select"/>
      </el-header>
      <el-main>
         <el-space class="e">
            <el-card :body-style="{ padding: '0px' }" v-for="v in maps" class="bu">
               <img class="image" :src="config.host+'/api/map/getPng/'+v.id" />
               <div style="padding: 14px">
                  <span>{{ v.id+':'+v.name }}</span>
                  <div class="bottom">
                     <span>{{ '作者:'+v.another+'  上传者:'+v.upload }}</span>
			<el-button-group>
                     <el-button text class="button" :icon="Download" />
                     <el-button text class="button" :icon="InfoFilled" />
			</el-button-group>
                  </div>
               </div>
            </el-card>
         </el-space>
      </el-main>
      <el-footer>
         <el-pagination
            v-model:current-page="pageNow"
            v-model:page-size="pageSize"
            :page-sizes="[5, 10, 15, 20]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400" :current-change="update()"
            :size-change="update()"
         />
      </el-footer>
    </el-container>
    <MapAdd :show="showUi" @change="showUi=!showUi"/>
</template>
<style>
.top{
height:80px;
}
.e{
width:90%;
   height: 100%;
margin-right:10px;
background-color:rgba(0,0,0,0)
}
.bu{
   width:250px;
   height: 264px;
}
.input-with-select {
   background-color: var(--el-fill-color-blank);
   width:90%;
}
.image {
  width: 100%;
  max-height: 250px;
  display: block;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
