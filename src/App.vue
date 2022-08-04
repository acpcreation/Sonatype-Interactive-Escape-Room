<template>
  <div id="app">
    <router-view/>
    
    <!-- <WebSocket/> -->
    <Player /> <!-- v-if="$route.name=='home'" -->
    

    <!-- <Audit v-if="audit" @closeAudit="audit=!audit"/> -->
    <Timer :start="timerState" v-if="storyMode == true"/>

    <b-modal id="allCompleteModal" title="All Challenges Complete!" ok-title="I'm on it!" ok-variant="success"  ok-only> 
      <p><b>Hooray!!</b> You completed all the challenges!</p>
      <p>Make sure you've collected <b><u>every clue</u></b>, then visit the locked computer in the escape room home screen to enter the password.</p>
    </b-modal>

  </div>
</template>

<script>
// import Audit from '@/components/Audit.vue'
import Timer from '@/components/Timer.vue'
import Player from '@/components/Player.vue'

// import WebSocket from '@/components/WebSocket.vue'

export default {
  name: 'App',
  components: {
    // Audit,
    Timer,
    Player
    // WebSocket
  },
  data(){
    return{
      // audit: false,
      complete: false,
      timerState: false,
      storyMode: false
    }
  },
  created() {
    this.$root.$on('AllComplete', this.allComplete);
  },

  mounted(){
    let progress = localStorage.getItem("progress");
    if(progress != null){
      
      console.log(progress)
      if(progress != "Freeplay"){ 
        progress = JSON.parse(progress)
        this.$store.commit('setAllProgress', progress); 
        this.storyMode = true;
        this.toggleTimer(true);
      }else{
        this.toggleTimer(false);
      }
    }
    // this.timeGame(true);

    // this.$store.commit('updateProgress', this.$route.name); 
    // let stuff = this.$store.getters.getProgress;

    // window.addEventListener('keydown', (e) => {
    //   if (e.key == '|') {
    //     this.audit = true;
    //   }
    // });

  },

  methods:{

    allComplete: function(){
      if(this.complete == false){
        this.complete = true;

        let that = this;
        setTimeout(function(){
          that.$bvModal.show("allCompleteModal")
        }, 2000);
      }
    },

    toggleTimer:function(e){
      this.timerState = e; 
    }


  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;

  background-image:
    linear-gradient(to bottom, rgba(22, 22, 22, 0.85),rgba(0, 0, 0, 0.85)); 

  /* border-top: 5px solid rgb(20, 20, 20); */
  /* padding-bottom:100px; */
}

a{
  cursor: pointer;
}

h1,h2,h3{
  all: none;
  font-weight: 100;
  letter-spacing: 1px;
  color: white;
  margin: 30px;
}

h1{
  font-size: 60px;
}

.h1Score{
  position: fixed;
  bottom: 8px;
  left:0px;
}

h2{
  font-size: 26;
}

p{
  color:white;
}

hr{
  width:80%;
}

.logo{
  width: 20vw;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

.centerItems{
  width:100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.returnToHomeButton{
  position: fixed;
  left: 20px;
  top: 20px;
  cursor: pointer;
}

.scrollContainer{
  overflow:scroll;
  height:85%;
  width:100%;
}

.successMessage{
  color: rgb(77, 248, 77) !important;
  margin:20px auto!important;
  max-width: 70vw;
  font-size: 20px !important;
}

.successMessage a{
  color: rgb(77, 248, 77);
}

.challengeDescription{
  padding:0px 15vw;
}

#allCompleteModal h2, #allCompleteModal p{
  color:black
}




</style>
