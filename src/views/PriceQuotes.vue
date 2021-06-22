<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Price Quotes</h1>
    <p>Determine the correct price for Sonatype's products in the different currencies</p>
    
    <p class="successMessage">{{completeMessage}}</p>

    <b-card no-body class="overflow-hidden cards" v-for="i in prices" :key="i.id">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-body :title="'Price in '+i.currency">
            <b-card-text>
              What would be the price in {{i.currency}} for {{i.products.toString().replaceAll(',',', ')}} with <b>{{i.users}}</b>? 
            </b-card-text>

            <div class="pillContainer">
              <span  class="pill" 
                    v-for="j in i.products" 
                    :key="j+i.id"
                    :style="'background-color:'+pillColors(j)">
                {{j}}
              </span>
            </div>

            <b-input-group>
              <template #prepend>
                <b-input-group-text ><b-icon icon="dash-circle-fill" font-scale="1" variant="warning" rotate="90"></b-icon></b-input-group-text >
              </template>
              <b-form-input placeholder="Number Value" type="number" :state="confirmPrice(i.id)" v-model="prices[i.id].input"></b-form-input>
            </b-input-group>

          </b-card-body>
        </b-col>
        <b-col md="6">
          <b-card-img src="/img/dollar.jpeg" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
      </b-row>
    </b-card>

  </div>
</template>

<script>
export default {
  name: 'PriceQuotes',
  props: {
    
  },
  components: {

  },
  computed: {
    
  },
  data(){
    return{
      prices:[
        {id:0, users:"100 users", products:["Lifecycle", "ADP"], currency:"Japanese Yen", input:"", answer:"100"},
        {id:1, users:"10 users",  products:["Repository Manager"], currency:"Venezuelan Bolívar", input:"", answer:""},
        {id:2, users:"75 users",  products:["Firewall"], currency:"", input:"", answer:""},
        {id:3, users:"15 nodes",  products:["Container"], currency:"", input:"", answer:""},
        {id:4, users:"25 users and 5 nodes", products:["Lifecycle", "Repository Manager", "Firewall", "Container", "IaC", "ADP", "ALP"], currency:"", input:"", answer:"100"},

      ],

      completeMessage: ""
    }
  },

  mounted() {
    


  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },
    
    confirmPrice: function(i) {
      let price = this.prices[i];
      if(price.input == price.answer){
        this.checkAllPricesCorrect();
        return true;
      }else{
        // return null;
        return false;
      }
    },

    pillColors: function(e){
      let colors = {
        Lifecycle: '#479FDC', //Blue
        Firewall: '#A830C2', //Purple
        RepositoryManager: '#4DBB73', //Green
        Container: '#EC646D', //Pink,
        IaC: '#F3BF4C',
        ADP: '#0F1C4D',
        ALP: '#E48F33'
      };
      let color = colors[e.replace(' ','')]
      return color;
    },

    checkAllPricesCorrect: function(){
      let correct = 0;
      for(let i in this.prices){
        let p = this.prices[i];
        if(p.input == p.answer){
          correct++;
        }
      }

      if(correct == this.prices.length){
        this.completeMessage = "Hooray!"
        window.scroll({
          top: 0, 
          left: 0, 
          behavior: 'smooth'
        });
      }
    }



  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding: 2vw;
}

.cards{
  width: 80vw;
  max-height:300px;
  margin: 30px auto;
  border-radius: 12px;
  text-align:left;
}

.cards p{
  color: black;
}

.pillContainer{
  display: flex;
  flex-wrap:wrap;
  margin-top:40px;
  margin-bottom: 20px;
}

.pill{
  border-radius:20px;
  margin: 3px;
  padding: 5px 10px;
  /* cursor: pointer; */
  color:white;
  text-align: center;
}








</style>
