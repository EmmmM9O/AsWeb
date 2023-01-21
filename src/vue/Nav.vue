<script lang="ts">
import { defineComponent } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { SideBarStore } from './stores/sidebar';
export default defineComponent({
    props:{
        PageList:Array<RouteRecordRaw>
    },
    data(){
        let temp:Array<RouteRecordRaw> =[];
        for(let i of this.$router.options.routes){
            if(i.meta?.show){
                temp.push(i);
            }
        }
        return(
            {
                stores:SideBarStore(),
                PageList:temp
            }
        );
    }
})

</script>
<template>
    <div class="TopList" :class="stores.showAddon?'l2':'l1'">
        <router-link v-bind:to="item.path" type="button" class="DaoHang" v-for="item in PageList" :class="item.path==$route.path ? 'DaoHang2' : ''">{{ item.name }}</router-link >
    </div>
</template>
<style scoped>
@import '@/assets/colorful.css';

.YinYing{
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
              rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
.l1{
    width: calc(100vw - 80px);

}
.l2{
    width: calc(100vw - 200px);
}
.TopList{
    opacity:0.6;
    background-color: rgba(0,0,0,0.3);
    backdrop-filter: blur(18px);
    border-radius: 12px;
    z-index: 9980;
    display: flex;
      box-shadow: rgb(0 0 0 / 20%) 0px 2px 0px -1px,
        rgb(0 0 0 / 14%) 0px 1px 0px 0px, rgb(0 0 0 / 12%) 0px 0px 0px 0px;
    line-height:80px;
    margin: 0;
    text-align:center;
    height: 80px;
    background-color: #eee;
    border-bottom : 4px solid rgba(0,0,0,0.3);
    transition: 0.5s;
}
.DaoHang{
    border-radius: 12px;
    background-color: rgba(0,0,0,0);
    height: 80px;
    width: auto;
    font-size: 70px;
    color: #000;
    text-align: center;
    line-height:80px;
    text-decoration:none;
}
.DaoHang:hover {
  background-color:rgba(255,255,255,1);
  color: black;
}
.DaoHang2{
    background-color: white;
}
</style>