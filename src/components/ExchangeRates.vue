<template>
  <div class="pane">
    <p v-for="i in currencies" :key="i">$1 USD = {{i}}</p>
  </div>
</template>

<script>
export default {
  name: 'ExchangeRates',
  props: {
    
  },

  data(){
    return{
      currencies:["110.6 Yen", "0.000029 Bitcoin", "22.65 Zambian Kwacha", "0.85 Euro"]
    }
  },

  mounted() {
    
  },

  methods: {
    // openPage: function(e) {
    //   this.$router.push("/"+e);
    // },


  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pane{
  position: absolute;
  z-index: 100;
  top: 65px;
  right: 20px;
  background: #0b0f1f;
  /* border: 3px solid black; */
  border-radius: 8px;
  padding:15px;
  overflow:scroll;
  max-height: 300px;
}

p{
  color: white;
  text-align: left;
}









</style>
