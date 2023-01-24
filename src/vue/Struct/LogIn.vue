<script setup lang="ts">
import { defineProps ,defineEmits,reactive,ref} from 'vue';
import {ElMessageBox} from 'element-plus'
import type { FormInstance } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
defineProps<{
    show:Boolean
}>();

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
    password:''
})

const passwordReg=/^[a-z0-9A-Z]{6,16}$/;
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
const rules = reactive({
  password: [{ validator: checkName, trigger: 'blur' }],
  name: [{ validator: checkPass, trigger: 'blur' }]
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
        title="登录"
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
        <el-form-item label="名字" prop="name">
            <el-input v-model="form.name" placeholder="名字" type="name" autocomplete="off"  />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="密码" type="password" autocomplete="off"  />
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
