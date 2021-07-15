<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Complete!</h1>
    <p>This is where we will put all of the hints from all of the challenges.</p>
    
    <video width="80%" id="videoPane" controls>
      <source src="../../public/video/complete.mp4" type="video/mp4">
        Your browser does not support HTML video.
    </video>

  </div>
</template>

<script>
export default {
  name: 'Complete',
  props: {
    
  },
  components: {

  },
  data(){
    return{
      
    }
  },

  mounted() {
    
    // let progress = this.$store.getters.getProgress;

    // let complete ={
    //   Cafeteria: true,
    //   Calculator: true,
    //   ClueFinder: true,
    //   Decoder: true,
    //   FamilyFeud: true,
    //   HangMan: true,
    //   PriceQuotes: true,
    //   RememberThePath: true,
    //   VRExplorer: true
    // };
    
    // if(progress != complete){
    //   this.openPage("");
    // }

  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },




  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding: 2vw;
}









</style>
