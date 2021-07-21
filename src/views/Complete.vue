<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Complete!</h1>
    <p>Watch the below video then click the Google Drive link</p>
    <p><a href="https://drive.google.com/drive/folders/1Q8xnLcn1dSU0lkdxZuTuHStIA5kerrr0?usp=sharing" target="_blank">Click HERE for Google Drive access</a></p>
    
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
    // let complete = true;
    // for(let i in progress){
    //   // console.log(progress[i])
    //   if(progress[i] != true){
    //     this.openPage("");
    //     complete = false;
    //   }
    // }
    
    this.$root.$emit('ToggleTimer', false); 
    
    // if(complete == true){
    //   document.getElementById("videoPane").play();
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

a{
  font-size: 20px;
}









</style>
