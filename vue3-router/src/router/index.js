import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import MyPage from '../views/MyPage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/mypage', name: 'MyPage', component: MyPage }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
