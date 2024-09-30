import { createRouter, createWebHistory } from 'vue-router';
import MainView from './pages/MainView.vue';
import Result from './pages/QueryResults.vue';

const routes = [
  { path: '/', name: 'home', component: MainView },
  { path: '/result', name: 'Result', component: Result },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;