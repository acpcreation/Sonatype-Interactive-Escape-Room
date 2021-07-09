import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        progress: {
            Cafeteria: false,
            ClueFinder: false,
            Decoder: false,
            FamilyFeud: false,
            HangMan: false,
            PriceQuotes: false,
            RememberThePath: false,
            VRExplorer: false
        },                
    },

    mutations:{
        updateProgress(state, data){
            state.progress[data] = true;
            localStorage.setItem("progress", JSON.stringify(state.progress));
        },

        resetProgress(state, data){
            state.progress = data;
        },

        

    },

    getters:{
        getProgress: state =>{
            return state.progress;
        },


    },

    actions: {
        
    },

    

})

