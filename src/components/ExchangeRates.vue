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
      currencies:[
        "75 Russian Ruble",
        "0.85 Euro",
        "6.27 Danish Krone",
        "110.6 Japanese Yen", 
        "0.000029 Bitcoin", 
        "22.65 Zambian Kwacha", 
        "20 Mexican Pesos",
        "321,359,000,000 Venezuelan Bolivar",
        "74.8 Indian Rupee",
        "0.000555717 Gold Ounce",
        "15.7 Egyptian Pound",
        "1.35 Australian Dollar",
        "0.001425 Lumber",
        "1.25 Canadian Dollar",
        "96 Argentine Peso",
        "3.28 Israeli New Shekel",
        "900 North Korean Won",
        "21.06 Surinamese Dollar",
      ]
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
