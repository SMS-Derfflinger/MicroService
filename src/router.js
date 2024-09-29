import { createRouter, createWebHistory } from 'vue-router';
import MainView from './pages/MainView.vue';
import Result from './pages/QueryResults.vue';

const routes = [
  { path: '/', component: MainView },
  { path: '/result', component: Result },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;