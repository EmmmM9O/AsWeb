<script setup lang="ts">
import {defineEmits,defineProps,ref,type Ref} from 'vue'
const props=defineProps<{
   tag:string[],
   star?:Boolean
}>();
defineEmits<{
   (e: 'update', value:string[]): void
}>();
interface Tag{
   value:string,
   label:string
}
interface F{
   tags:Array<Tag>,
   key:string,
   label:string
}
const tags:Ref<Array<F>>=ref([
   {
      key:"mode",
      label:"模式",
      tags:[
         {value:"s",label:"生存"},
         {value:"p",label:"PvP"},
         {value:"s",label:"沙盒"},
         {value:"a",label:"进攻"},
         {value:"e",label:"编译器"},
         {value:"c",label:"自定义"}
      ]
   },
   {
      key:"other",
      label:"其他",
      tags:[
         {value:"js",label:"JS"}
      ]
   }
])
if(props.star==null||!props.star){
   tags.value[1].tags.push({value:"star",label:"精选"});
}
</script>
<template>
<el-select
            :model-value="tag"
            @change="(val:unknown)=>$emit('update',val)"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="标签"
         >
         <el-option-group
            v-for="value in tags"
            :key="value.key"
            :label="value.label"
         >
            <el-option
               v-for="item in value.tags"
               :key="item.value"
               :label="item.label"
               :value="item.value"
            />
         </el-option-group>
      </el-select>
</template>


