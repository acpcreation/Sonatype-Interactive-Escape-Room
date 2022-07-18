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
            // FamilyFeud: false,
            // HangMan: false,
            PriceQuotes: false,
            RememberThePath: false,
            // VRExplorer: false
            VulnerabilitySort:false
        },  
        passcode:[],
        storyMode: "Freeplay"
    },

    mutations:{
        updateProgress(state, data){
            state.progress[data.route] = true;
            if(state.storyMode == "Story"){
                localStorage.setItem("progress", JSON.stringify(state.progress));
            }

            let complete = true;
            for(let i in state.progress){
                if(state.progress[i] != true && i != "Complete"){
                  complete = false;
                }
            }

            if(complete == true && state.progress.Complete != true){
                let that = data.context;
                that.$root.$emit('AllComplete'); 
            }
        },

        setAllProgress(state, data){
            state.progress = data;
        },

        storePasscode(state, data){
            state.passcode = data;
        },

        setStoryMode(state, data){
            //Story / Freeplay
            state.storyMode = data;
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

