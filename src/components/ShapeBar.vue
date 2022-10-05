<script setup lang='ts'>
import { reactive, ref } from 'vue';
const emit = defineEmits<{
    //(e: 'colorChanged', color: string): void
    (e: 'toolChanged', id: number,name:string): void
}>()
// const tools = reactive([
//     { id: 0, name: 'Move', icon: 'cursor-move' },
//     { id: 1, name: 'Select', icon: 'select-drag' },
//     { id: 2, name: 'Paintbrush', icon: 'brush' },
//     { id: 3, name: 'Paint Bucket', icon: 'format-color-fill' },
//     { id: 4, name: 'Crop', icon: 'crop' },
//     { id: 5, name: 'Eraser', icon: 'eraser' },
//     { id: 6, name: 'Pen', icon: 'fountain-pen-tip' },
//     { id: 7, name: 'Shape', icon: 'shape' },
//     { id: 8, name: 'Text', icon: 'format-text' },
// ]);
const tools = reactive([
    { id: 0, name: 'transform', icon: 'cursor-default' },
    { id: 1, name: 'edit', icon: 'cursor-default-click' },
    { id: 2, name: 'rect', icon: 'rectangle' },
    { id: 3, name: 'line', icon: 'minus' },
    { id: 4, name: 'triangle', icon: 'triangle' },
    { id: 5, name: 'ellipse', icon: 'ellipse' },
    { id: 6, name: 'quadratic', icon: 'vector-curve' },
    { id: 7, name: 'pencil', icon: 'pencil' },
    { id: 8, name: 'text', icon: 'format-text' },
]);
const activeTool = ref(0)
const color = ref('#ffffff')

function selectedToolChanged(id: number,name:string) {
    activeTool.value = id;
    emit('toolChanged', id,name);

}
// function selectedColorChanged() {
//     emit('colorChanged', color.value);
// }



</script>

<template>
    <div class="toolbar">
        <div class="tool-container" v-for="tool in tools" :key="tool.id">
            <button :title="tool.name" :class="tool.id === activeTool ? 'toolbar-button-active' : 'toolbar-button'"
                @click="selectedToolChanged(tool.id,tool.name)">
                <i :class="`mdi mdi-${tool.icon}`"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
.toolbar {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    border: 0.1px solid;
    border: 1px solid rgba(0, 0, 0, 0.5);
    background-color: #f0f0f0;
}

.tool-container {
    background-color: white;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

.toolbar-button {
    width: 48px;
    height: 48px;
    outline: none;
    border: none;
    background: none;
    font-size: 16pt;

}

.toolbar-button:hover {
    background-color: #f2f2f2;
}

.toolbar-button-active {
    width: 48px;
    height: 48px;
    outline: none;
    background: #0c76da;
    border: none;
    font-size: 16pt;
}
</style>