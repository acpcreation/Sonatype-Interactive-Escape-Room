<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Jeopardy</h1>
    <p>In this challenge you need to beat a game of Jeopardy. Guess letters to find the hidden questions.</p>

  <div class="centerItems">
    <table>
      <tr>
        <td>A</td>
        <td>B</td>
        <td>C</td>
      </tr>
    </table>
  </div>

  </div>
</template>

<script>
export default {
  name: 'Jeopardy',
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

td{
  color: white;
  font-size: 28px;
  text-align: center;
}








</style>
