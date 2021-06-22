<template>
  <div class="main centerItems">
    <div class="pane">
      <b-icon class="closeButton" icon="x-circle-fill" font-scale="2" variant="light" @click="closePane()"></b-icon>
      <h3>TRAINING VIDEO</h3>
      <!-- <video width="100%" id="videoPane" controls >
        <source src="../../public/img/hexagon.png" type="video/mp4">
          Your browser does not support HTML video.
      </video> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {

  },
  data(){
    return{
      
    }
  },

  mounted: function(){

  },

  methods:{
    closePane: function() {
      this.$emit("closeWelcome");
    },



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main{
  position:fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background-color: rgba(22, 22, 22, 0.80);
  z-index: 100;
}

.pane{
  width:70vw;
  height: 40vh;
  margin-top: 8vh;
  background-color: rgb(26, 26, 26);  
  border: solid;
  border-color: rgb(235, 251, 255);
  border-width:10px;
  border-radius: 10px;
  text-align: center;  
}

.closeButton{
  /* position:fixed;
  left:21.2vw;
  top:13vh; */

  margin-top: 10px;
  margin-left:-65vw;
  cursor: pointer;
}



</style>
