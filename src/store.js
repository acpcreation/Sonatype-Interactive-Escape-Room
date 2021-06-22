import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        loggedIn: false,                
    },

    mutations:{
        updateLoginStatus(state, data){
            // localStorage.setItem("login", data);
            state.loggedIn = data;
        },

        

    },

    getters:{
        getLoginStatus: state =>{
            return state.loggedIn;
        },


    },

    actions: {
        
    },

    

})

