<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <!-- GAME WHERE YOU GET THE 4 COLOR BUTTONS AND COMPUTER WILL LIGHT THE BUTTONS IN SOME ORDER.
        PLAYERS MUST CLICK THE BUTTONS IN THE SAME ORDER WHEN THE PATTERN IS DONE. 
        EACH TIME THE PATTERN GETS LONGER.-->
  </div>
</template>

<script>
export default {
  name: 'MemoryPattern',
  props: {
    
  },
  components: {

  },
  data(){
    return{
      
    }
  },

  mounted() {
    


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
