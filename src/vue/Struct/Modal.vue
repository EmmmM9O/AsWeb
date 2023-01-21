<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
    props:{
        show:Boolean,
        showclose:Boolean
    }
})
</script>
<template>
    <Transition name="modal" class="modal-mask">
        <div v-if="show">
            <div class="modal-wrapper">
                <div class="modal-container glass">
                    <div class="modal-header">
                        <slot name="header"></slot>
                    </div>
                    <div class="modal-body">
                        <slot name="body"></slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            <button v-if="showclose"
                                class="modal-default-button"
                                @click="$emit('close')"
                            >关闭</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
<style scoped>
@import '@/assets/colorful.css';

.YinYing{
        box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px,
        rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
}
.modal-mask{
    position: fixed;
    z-index: 9998;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}
.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
.modal-leave-to {
    opacity: 0;
}
.modal-default-button {
    float: right;
}
.modal-enter-from {
    opacity: 0;
}
.modal-header h1 {
    margin-top: 0;
    color: rgb(23, 114, 180);
}
.modal-body {
    margin: 20px 0;
}
.modal-container {
    width: 30vw;
    min-height: 150px;
    margin: 0px auto;
    padding: 20px 30px;
    border-radius: 12px;
    transition: all 0.3s ease;
    background-color: white;

}

</style>