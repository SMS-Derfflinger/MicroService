import { createRouter, createWebHistory } from 'vue-router';
import MainView from './pages/MainView.vue';
import Result from './pages/QueryResults.vue';
import RankingView from './pages/RankingView.vue';
import RaceView from './pages/RaceView.vue';

const routes = [
  { path: '/', name: 'home', component: MainView },
  { path: '/result', name: 'result', component: Result },
  { path: '/ranking', name: 'ranking', component: RankingView },
  { path: '/race', name: 'race', component: RaceView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;