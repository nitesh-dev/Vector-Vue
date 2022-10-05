import { createApp } from 'vue'
import '#src/css/style.css'
import '@mdi/font/css/materialdesignicons.min.css';
// import App from '@/app/App.vue'
// import  LearnApp  from "@/app/LearnApp.vue";
// import LearnApp2 from "@/app/LearnApp2.vue"
// import VectorAppVue from '@/app/VectorApp.vue';
import LayoutAppVue from '../app/LayoutApp.vue';
import TreeAppVue from '../app/TreeApp.vue';
import GridLayoutAppVue from '../app/GridLayoutApp.vue';
import VectorAppVue from '../app/VectorApp.vue';
import ShapeEditorAppVue from "../app/ShapeEditorApp.vue";
createApp(ShapeEditorAppVue).mount('#app')
