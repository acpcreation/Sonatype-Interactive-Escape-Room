import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        progress: {
            Cafeteria: false,
            Calculator: false,
            ClueFinder: false,
            Decoder: false,
            FamilyFeud: false,
            HangMan: false,
            PriceQuotes: false,
            RememberThePath: false,
            VRExplorer: false
        },  
        passcode:[]
    },

    mutations:{
        updateProgress(state, data){
            state.progress[data] = true;
            localStorage.setItem("progress", JSON.stringify(state.progress));
        },

        setAllProgress(state, data){
            state.progress = data;
        },

        storePasscode(state, data){
            state.passcode = data;
        },

    
    },

    getters:{
        getProgress: state =>{
            return state.progress;
        },

        getPasscode: state =>{
            return state.passcode;
        },


    },

    actions: {
        
    },

    

})

