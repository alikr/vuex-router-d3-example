<template>
	<div class="app" @click='add()'>
		<div>{{name}}</div>
		<list></list>
	</div>
</template>
<script>
	import Vue from 'vue';
	import Vuex from 'vuex';
	import list from './list.vue';
	Vue.use(Vuex);
	export default {
		components:{
			list
		},
		computed:Vuex.mapGetters({
	        name : 'name'
	    }),
	    methods:{
	        add : function(param){
	        	param = new Date().getTime();
	            this.$store.dispatch('ADD',param).then(function(resp){
	                console.log(resp);
	            })
	        }
	    }
	}
</script>