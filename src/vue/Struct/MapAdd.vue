<script setup lang="ts">
import { defineEmits,defineProps,ref ,reactive} from 'vue';
import Tags from '@/vue/Struct/Tags.vue';
import type { UploadProps, UploadUserFile,UploadInstance ,UploadFile,UploadFiles,UploadRequestOptions} from 'element-plus'
import { ElMessage } from 'element-plus';
import config from '@/config';
import UserStore from '../Stores/User';
import axios from 'axios';
const user=UserStore();const g=ref(false);
const fileList = ref<UploadUserFile[]>([]);
const fileListU = ref<Array<File>>([]);
const uploadRef = ref<UploadInstance>();

defineProps<{
    show:Boolean
}>();
const emits=defineEmits<{
    (e: 'change'): void,
}>();
const form=reactive({
    name:'',
    tags:[] as string[],
    another:user.name,
    docs:''
})
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('你确定?这些将不会保存')
        .then(() => {
            emits('change')
            done()
        })
        .catch(() => {
        })
}
const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, _uploadFiles) => {
    return ElMessageBox.confirm(
        `确定删除 ${uploadFile.name} ?`
    ).then(() => true,() => false)};
const Success: UploadProps['onSuccess'] = (
  response,
) => {
    ElMessage.success('上传成功');
    emits('change');
}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    let fileExtension = rawFile.name.substring(rawFile.name.lastIndexOf('.') + 1);
    let w=['png','msav'];
      if (!w.includes(fileExtension)) {
          ElMessage.error('错误的文件类型 应为:'+w);
        return false
        } else if (rawFile.size / 1024 / 1024 > 4) {
            ElMessage.error('不能超过 4MB!')
            return false
        }
        return true
}
const err:UploadProps['onError']=(error: Error, _uploadFile: UploadFile, _uploadFiles: UploadFiles) =>{
    ElMessage.error(error);
}

const uploadFile= (options: UploadRequestOptions )=>{
    fileListU.value.push(options.file);
    if(fileListU.value.length<2) return ;
    let data=new FormData();
    for(let i in fileListU.value){
        data.append(String(i),fileListU.value[i]);
    }
    data.append("name",form.name);
    data.append("decs",form.docs);
    data.append("another",form.another);
    data.append("token",user.token);
    axios.post(config.host+'/api/map/upload',data,{ headers: {"Content-Type": "multipart/form-data"}})
    .then(res=>{
        if(res.data.state!=1){
            ElMessage.error(res.data.erron);
            return ;
        }
    })
    .catch(err=>{
        ElMessage.error(err);
    })

}
function submit(){
    uploadRef.value?.submit();
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
            show-word-limit maxlength="28" minlength="3"  />
            <el-switch
    v-model="g"
    class="ml-2"
    inline-prompt
    style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    active-text="格式化"
    inactive-text="正常化"
  />
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
            :limit="2" :action="config.host+'/api/map/upload'"
            :on-error="err" :http-request="uploadFile"
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
        <el-button class="ml-3" type="success" @click="submit()">
            上传
        </el-button>
        <el-button type="" @click="$emit('change')">取消</el-button>
    </template>
    </el-dialog>
</template>
<style>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
