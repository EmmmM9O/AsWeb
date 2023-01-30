<script setup lang="ts">
import { Eleme ,Picture,Refresh} from '@element-plus/icons-vue';
import {ref,defineEmits,defineProps} from 'vue';
import config from '@/config';
import axios from 'axios';
import {ElMessage} from 'element-plus'

const props=defineProps<{
    'vccode':String,
    'isrobot':Boolean
}>()
const vccode=ref(props.vccode);
const show=ref(false);
const robotToken=ref('');
const IsRobot=ref(props.isrobot);
const emit=defineEmits<{
    (e: 'update', value:string): void,
    (e: 'ok', value:string): void,
    (e: 'changeToken', value:string): void
}>();
function update(){
	ElMessage.info('刷新中')
    show.value=false;
    axios.post(config.host+'/api/robot/getVccode',{"lock":'登录'})
    .then(res=>{
        if(res.data.state!=1){
            ElMessage.error('错误'+res.data.erron);
            return ;
        }
        robotToken.value=res.data.result;
        emit('changeToken',robotToken.value);
        ElMessage.success('刷新成功')
        show.value=true;
    }).catch(e=>{
        console.error(e);
        ElMessage.error("特大错误"+e)
    });
}
function up(){
    if(robotToken.value.length<=0){
        ElMessage.error('你没验证码???')
        return ;
    }
    if(vccode.value.length<=0){
        ElMessage.error('你验证码呢?');return ;
    }
    ElMessage.info('开始验证');
    axios.post(config.host+'/api/robot/checkVccode',{
        "token":robotToken.value,
        "vccode":vccode.value
    }).then(res=>{
        if(res.data.state!=1){
            ElMessage.error('错误'+res.data.erron);return ;
        }
        IsRobot.value=true;
        emit('ok',res.data.result);
        ElMessage.success('验证成功')
    }).catch(e=>{
        ElMessage.error("特大错误"+e)
        console.error(e);
    })
}
update();
</script>
<template>
    <el-input v-model="vccode" placeholder="机器验证码" @change="$emit('update',vccode)"
     type="robotV" autocomplete="off" :disabled="!show"  
     :loading-icon="Eleme" :loading="!show">
        <template #prepend>
            <el-skeleton style="width: 64px" :loading="!show" animated>
        <template #template>
            <el-skeleton-item variant="image" style="width: 64px; height: 28px" />
        </template>
        <template #default >
            <el-image :src="config.host+'/api/robot/getPngV/'+robotToken" key="fill" style="width: 64px; height: 28px">
                <template #error>
                    <div class="image-slot">
                        <el-icon><Picture /></el-icon>
                    </div>
                </template>
            </el-image>
        </template>
        </el-skeleton>
        </template>
        <template #append>
            <el-button-group>
            <el-button :disabled="!show" @click="up()">提交</el-button> 
            <el-button :icon="Refresh" circle @click="show=false;update()"/>
            </el-button-group>
        </template>
     </el-input>
</template>
