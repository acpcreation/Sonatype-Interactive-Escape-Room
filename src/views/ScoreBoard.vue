<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>

    <div class="centerItems">
      <div class="scoreCollumn">
        <p>Title</p>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: {
    
  },
  components: {

  },
  data(){
    return{
      
    }
  },

  mounted() {
    var name = "Noah"


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

.centerItems{

}

.scoreCollumn{

}








</style>
