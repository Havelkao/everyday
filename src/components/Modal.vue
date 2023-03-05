<template>
    <div v-if="data.isVisible" class="modal">
        <div @click="hideModal">x</div>
        <slot></slot>
    </div>
</template>

<script setup>
const props = defineProps(['data'])

function hideModal() {
    props.data.isVisible = false;
}
</script>

<style scoped>
.modal {
    position: absolute;
    width: auto;
    z-index: 20;
    background-color: var(--bg-color);
    width: 100%;
}
</style>
