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
.YinYing{
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
              rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
.l1{
    width: 95vw;
}
.l2{
    width: 88vw;
}
.TopList{
    display: flex;
      box-shadow: rgb(0 0 0 / 20%) 0px 2px 0px -1px,
        rgb(0 0 0 / 14%) 0px 1px 0px 0px, rgb(0 0 0 / 12%) 0px 0px 0px 0px;
    line-height:10vh;
    margin: 0;
    text-align:center;
    height: 10vh;
    background-color: #eee;
    border-bottom: 4px solid white;
    transition: 0.5s;

}
.DaoHang{
    background-color: rgb(0 0 0 / 5%);
    height: 10vh;
    width: auto;
    font-size: 8vh;
    color: #000;
    text-align: center;
    line-height:10vh;
    text-decoration:none;
}
.DaoHang:hover {
  background-color: white;
  color: black;
}
.DaoHang2{
    background-color: white;
}
</style>