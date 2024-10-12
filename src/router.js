import { createRouter, createWebHistory } from 'vue-router';
import MainView from './pages/MainView.vue';
import Result from './pages/QueryResultsView.vue';
import RankingView from './pages/RankingView.vue';
import RaceView from './pages/RaceView.vue';
import RaceResult from './pages/RaceResultView.vue';

const routes = [
  { path: '/', name: 'home', component: MainView },
  { path: '/result', name: 'result', component: Result },
  { path: '/ranking', name: 'ranking', component: RankingView },
  { path: '/race', name: 'race', component: RaceView },
  { path: '/race-result', name: 'race-result', component: RaceResult },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;