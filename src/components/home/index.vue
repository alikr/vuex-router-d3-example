<script>
	import Vue from 'vue';
	import Vuex from 'vuex';
	import store from '_vuex/store';
	import app from './app.vue';
	import css from './style.css';
	Vue.use(Vuex);
	export default {
		store,
		render:(h)=>h(app),
		methods:{
	        add : function(param){
	            this.$store.dispatch('ADD',param).then(function(resp){
	                console.log(resp);
	            });
	        }
	    }
	}
</script>