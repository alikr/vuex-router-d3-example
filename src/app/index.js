import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import routes from './routes.js';
import main from './main.vue';

Vue.use(Vuex);
Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes
});

const app = new Vue({
	el: '#app',
	router,
	render:(h)=>h(main)
});