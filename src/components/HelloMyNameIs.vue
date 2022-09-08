<template>
  <div class="main">
    Hello my name is..
    <div class="sub">
      {{this.$store.getters.getPlayer}}
    </div>

  </div>
</template>

<script>
export default {
  name: 'HelloMyNameIs',
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


   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: right;
  padding: 40px 10px 10px 10px;
  background-color: rgb(0, 162, 255);
  border-radius: 6px;
  position:absolute;
  top:110px;
  right:200px;
  font-size: 12px;
  transform: rotate(8deg);

}

.sub{
  text-align: center;
  width: 100%;
  background-color: white;
  font-family: sans-serif;
  font-size:16px;
  border-radius: 6px;
  padding:10px 15px;
  text-transform: capitalize;
}









</style>
