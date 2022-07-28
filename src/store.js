import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
        storyMode: "Freeplay",
        player:"Player1",
        axiosURL:"http://localhost:3000/"
    },

    mutations:{
        updateProgress(state, data){
            state.progress[data.route] = true;
            if(state.storyMode == "Story"){
                localStorage.setItem("progress", JSON.stringify(state.progress));
            }

            //Send score to dashboard
            let dateTime = new Date();

            axios.post(state.axiosURL+'SubmitScore', {
                id: state.player, 
                score:data.score, 
                time: dateTime, 
                game:data.route
            }).then((res) => {
                console.log(res.data);
                // alert(res.data)
            }, (err) => {
                console.log(err);
            });


            //Check if all games are complete
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

        setPlayer(state, data){
            state.player = data;

            axios.post(state.axiosURL+'SubmitScore', {
                id:"Player7", 
                score:232280, 
                time:"1/2/7", 
                game:"Escape the Maze"
            }).then((res) => {
                console.log(res.data);
            }, (err) => {
                console.log(err);
            });
        },
    
    },

    getters:{
        getProgress: state =>{
            return state.progress;
        },

        getPasscode: state =>{
            return state.passcode;
        },

        getPlayer: state =>{
            return state.player;
        },

    },

    actions: {
        
    },

    

})

