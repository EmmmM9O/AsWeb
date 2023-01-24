<script setup lang="ts">
import { defineProps ,defineEmits,reactive,ref} from 'vue';
import {ElMessageBox} from 'element-plus'
import type { FormInstance } from 'element-plus'
import robot from './robot.vue';
const button=ref('发送'),robotVShow=ref(false);
const ruleFormRef = ref<FormInstance>();
defineProps<{
    show:Boolean
}>();
const    mailReg=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
const handleClose = (done: () => void) => {
    if(form.name.length<=0||form.password.length<=0){
        done();
        emits("change");
        return ;
    }
    ElMessageBox.confirm('你确定？')
    .then(() => {
        emits("change");
        done();
    });
}
const form=reactive({
    name:'',
    password:'',
    password2:'',
    mail:'',
    vccode:'',
    robotV:''
})
const IsRobot=ref(false);
const passwordReg=/^[a-z0-9A-Z]{6,16}$/;
const checkMail=(rule: any, value: any, callback: any) =>{
    if(!value||typeof value!=='string'){
        callback(new Error('请输入密码'));return ;
    }
    if(!mailReg.test(value)){
        callback(new Error('邮箱不合法'));return ;
    }
    callback();
}
const checkName=(rule: any, value: any, callback: any) =>{
    if(!value||typeof value!=='string'){
        callback(new Error('请输入密码'));
        return ;
    }
    if(value.length<6||value.length>16){
        callback(new Error('密码在6-16长度之间'));
        return;
    }
    if(!passwordReg.test(value)){
        callback(new Error('密码不合法 只能数字和字母'));
        return;
    }
    callback();
};
const checkPass= (rule: any, value: any, callback: any) => {
    if(!value||typeof value!=='string'){
        callback(new Error('请输入名字'));
        return;
    }
    if(value.length<2||value.length>20){
        callback(new Error('名字长度在2-20之间'));
    }
    callback();
}
const checkPass2= (rule: any, value: any, callback: any) => {
    if(!value||typeof value!=='string'){
        callback(new Error('请再输入一次密码'));
        return ;
    }
    if(value!=form.password){
        callback(new Error('密码不相同'))
        return;
    }
    callback();
}

const rules = reactive({
  password: [{ validator: checkName, trigger: 'blur' }],
  name: [{ validator: checkPass, trigger: 'blur' }],
  password2: [{ validator: checkPass2, trigger: 'blur' }],
  mail: [{ validator: checkMail, trigger: 'blur' }]

});
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
}
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!');
        }
    })
}
const emits=defineEmits(['change']);
</script>
<template>
    <el-dialog
        :model-value="show"
        title="注册"
        width="auto"
        :before-close="handleClose"
        center
        align-center
    >
    <el-form 
    :model="form" label-width="120px"
    :rules="rules"
    ref="ruleFormRef"
    status-icon
    label-position="left"
	class="demo-ruleForm"
	size="default"
    >
        <el-form-item label="名字" prop="name" >
            <el-input v-model="form.name" placeholder="名字" type="name" autocomplete="off"  maxlength="20" show-word-limit minlength="2"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="密码" type="password" autocomplete="off" show-word-limit maxlength="16" minlength="6"  />
        </el-form-item>
        <el-form-item label="再一次密码" prop="password2">
            <el-input v-model="form.password2" placeholder="再一次密码" type="password2" autocomplete="off"  />
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
            <el-input v-model="form.mail" placeholder="邮箱" type="mail" autocomplete="off"  />
        </el-form-item>
        <el-from-iten label="机器验证码" prop="robotV">
            <robot @update="(v)=>{form.robotV=v}" :vccode="form.robotV" :isrobot="IsRobot" @ok="IsRobot=true"/>
        </el-from-iten>
        <el-form-item label="验证码" prop="vccode">
            <el-input v-model="form.vccode" placeholder="验证码" type="vccode" autocomplete="off" :disabled="button!='发送'" >
                <template #append>
                    <el-button type="primary" plain :disabled="button!='发送'">{{ button }}</el-button>
                </template>
            </el-input>
        </el-form-item>

    </el-form>
    <template #footer >
        <span class="dialog-footer">
            
            <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            
        <el-button type="" @click="$emit('change')">取消</el-button>
        </span>
    </template>
    </el-dialog>
</template>
<style>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
