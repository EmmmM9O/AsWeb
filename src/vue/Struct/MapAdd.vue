<script setup lang="ts">
import { defineEmits,defineProps,ref ,reactive} from 'vue';
import Tags from '@/vue/Struct/Tags.vue';
import type { UploadProps, UploadUserFile,UploadInstance } from 'element-plus'
import { ElMessage } from 'element-plus';
const fileList = ref<UploadUserFile[]>([]);
const uploadRef = ref<UploadInstance>()
defineProps<{
    show:Boolean
}>();
defineEmits<{
    (e: 'change'): void,
}>();
const form=reactive({
    name:'',
    tags:[] as string[],
    another:'',
    docs:''
})
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('你确定?这些将不会保存')
        .then(() => {
            done()
        })
        .catch(() => {
        })
}
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(
        `确定删除 ${uploadFile.name} ?`
    ).then(() => true,() => false)};
const Success: UploadProps['onSuccess'] = (
  _response,
  _uploadFile
) => {
  ElMessage.success('上传成功');
}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    let fileExtension = rawFile.name.substring(rawFile.name.lastIndexOf('.') + 1);
    let w=[];
    w=['png','msav'];
    if(fileList.value.length<=0){
        for(let i of fileList.value){
            let fileExtension = i.name.substring(i.name.lastIndexOf('.') + 1);
            w=w.filter(it=>it!=fileExtension);
        }
    }
      if (!w.includes(fileExtension)) {
          ElMessage.error('错误的文件类型 应为:'+w);
        return false
        } else if (rawFile.size / 1024 / 1024 > 4) {
            ElMessage.error('不能超过 4MB!')
            return false
        }
        return true
}
</script>
<template>
    <el-dialog
    :model-value="show"
        title="新建地图"
        width="60%"
        :before-close="handleClose"
    >
    <el-form :model="form" label-width="80px">
        <el-form-item label="作品信息">
            <el-input v-model="form.name" placeholder="名字" 
            show-word-limit maxlength="28" minlength="3"
            />
            <el-input v-model="form.another" placeholder="作者" 
            show-word-limit maxlength="28" minlength="3" />
        </el-form-item>

        <el-form-item label="简介">
            <el-input v-model="form.docs"
            type="textarea" placeholder="简介"
            :autosize="{ minRows: 5}" maxlength="600" 
            show-word-limit
            />
        </el-form-item>
        <el-form-item label="标签">
            <Tags :tag="form.tags" @update="(val)=>form.tags=val" :star="true"/>
        </el-form-item>
        <el-form-item label="文件">
            <el-upload v-model:file-list="fileList" multiple :auto-upload="false" ref="uploadRef"
            :before-remove="beforeRemove" :on-success="Success" :before-upload="beforeUpload"
            >
            <template #trigger>
                <el-button type="primary">选择文件</el-button>
            </template>
            
            <template #tip>
                <div class="el-upload__tip">
                    地图文件和png的图片
                </div>
            </template>
            </el-upload>
        </el-form-item>
    </el-form>
    <template #footer >
        <el-button type="" @click="$emit('change')">取消</el-button>
    </template>
    </el-dialog>
</template>
<style>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
