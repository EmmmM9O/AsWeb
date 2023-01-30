<script setup lang="ts">
import {ref} from 'vue';
const Reg=/((?<=[^\]\[])|^)\[{1}[^\[\]\n]*\]{1}((?=[^\[\]])|$)/;
const text=ref('[red]Hello Color');
interface colors{
    [index:string]:string|null
}
const Colors={
    blue:"rgba(0,0,255,255)",
    red:"rgba(255,0,0,255)",
    green:"rgba(0,255,255,255)",
} as colors;
interface table{
    color:string,
    text:string
}
const textt=ref('')
const draw=ref<Array<table>>([]);
function update(){
    let tmp=text.value;let last='';
	draw.value=[];
textt.value='';
    while(true){
        let index=tmp.search(Reg);
        let g=tmp.match(Reg);
	let regstr='';
        if(g==null) {
		regstr='';
		index=tmp.length;
}
        else  regstr=g[0];
            let k=tmp.substring(0,index),w=last.substring(1,last.length-1);
            if(last.length<=0) draw.value.push({color:'black',text:k});
            else if(last=='[]') draw.value[draw.value.length-1].color=draw.value[draw.value.length-2].color;
            else if(w.startsWith('#')) draw.value.push({color:w,text:k});
            else if(Colors[w]!=null) draw.value.push({color:Colors[w] as string,text:k});
            else draw.value[draw.value.length-1].text+=k;
            last=regstr;
            tmp=tmp.substring(index+regstr.length);
            console.log(regstr+'-'+k+'-'+tmp+'-'+index);
            textt.value+=regstr+'-'+k+'-'+'-'+index+'\n'+'now:'+tmp+'\n';
	if(g==null||g.length<=0) return ;
        }
    }
update();
</script>
<template>
    <el-input v-model="text" :autosize="{ minRows: 12}" maxlength="600" 
    type="textarea" placeholder="文本编辑器" show-word-limit @change="update()"/>
    <span v-for="v in draw" :style="{'color':v.color,'width':'auto'}">{{ v.text }}</span>
</template>
<style>

</style>
