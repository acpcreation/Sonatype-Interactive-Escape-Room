<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h3>VR Explorer</h3>
    <p>Take a look around! In this challenge you need to visit every node in order to collect clues around securing containers.</p>
    <p class="successMessage">{{successMessage}}</p>

    <b-progress 
        :value="visited.length" 
        :max="content.length"  
        class="progressBar"
        animated></b-progress>

    <VRShapesView @openInfo="openInfo($event)"/>
                                                                                                                <!-- @ok="resetPath()" -->
    <b-modal id="vrDetailsModal" :title="currentContent.title+' - 00'+currentContent.id" class="modal" ok-title="Explore Onward" ok-variant="warning"  ok-only> 
      <!-- <p v-if="visited.includes(currentContent.id) == true" class="visited">Visited {{visited}}</p> -->
      <p>{{currentContent.description}}</p>
     
    </b-modal>
  </div>
</template>

<script>
import VRShapesView from '@/components/VRShapesView.vue'

export default {
  name: 'VRExplorer',
  props: {
    
  },
  components: {
    VRShapesView,
    
  },

  computed: {
    
  },
  data(){
    return{
      successMessage:"",
      visited: [],

      content:[
        {title:"", description:"", threats:[""]},
        {title:"", description:"", threats:[""]},
        {title:"", description:"", threats:[""]},
        {title:"", description:"", threats:[""]},
        {title:"Container: zzz", description:"description", threats:["vectors"]},
        {title:"", description:"", threats:[""]},
        {title:"", description:"", threats:[""]},
        {title:"", description:"", threats:[""]},
        {title:"", description:"", threats:[""]},
        {title:"", description:"", threats:[""]},
        {title:"", description:"", threats:[""]},
      ],
      currentContent: {}

    }
  },

  mounted() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "hint!";
    }


  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },
    
    openInfo: function(e) {
      if(!this.visited.includes(e)){
        this.visited.push(e)
      }
      this.currentContent = this.content[e];
      this.currentContent.id = e;

      this.$bvModal.show("vrDetailsModal"); 
    },

    

    challengeComplete: function(){
      this.successMessage = "hint!";
      this.$store.commit('updateProgress', this.$route.name);
    }
   




  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding:20px;
}

.returnToHomeButton{
  z-index:100;
}

.progressBar{
  z-index:100;
  position: fixed;
  left: -230px;
  top:50vh;
  width: 60vh;
  transform: rotate(-90deg);
}

.modal p{
  color: black;
}

/* .visited{
  color: rgb(92, 92, 92);
  font-size: 10px;
  font-weight: bold;
} */







</style>
