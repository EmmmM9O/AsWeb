<script setup lang="ts">
import { SideBarStore } from '../stores/sidebar';
const stores=SideBarStore();
</script>
<template>
    <Transition class="slide-fade">
        <slot v-if="stores.showAddon"></slot>
    </Transition>
</template>
<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
    }
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
    opacity: 0;
}
</style>