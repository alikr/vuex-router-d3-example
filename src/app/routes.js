import home from '../components/home/index.vue';
import login from '../components/login/index.vue';
import NotFound from '../components/404/index.vue';

export default [
  { path: '/home', component: home },
  { path: '/', redirect: '/home' },
  { path: '/login', component: login },
  { path: '*', component: NotFound }
]