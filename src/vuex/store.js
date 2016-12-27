import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: 0
    },
    mutations:{
        "ADD": function(state, msg) {
            state.name = msg;
        }
    },
    actions:{
        "ADD" : function(store , param){
        	// return store.state.name;
            return new Promise(function(resolve, reject) {
                store.commit('ADD',param);
                // resolve("ok");
            });
        },
    },
    getters:{
        name:function(state){
            return state.name
        }
    }
});