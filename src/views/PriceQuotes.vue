<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Price Quotes</h1>
    <p class="challengeDescription">Determine the correct price for Sonatype's products in the different currencies. Round to the nearest dollar.</p>
    
    <p class="successMessage">{{successMessage}}</p>

    <ExchangeRates v-if="exchangeRates"/>
    <b-button class="exchangeRateButton" variant="warning" @click="exchangeRates= !exchangeRates">Exchange Rates</b-button>


    <b-card no-body class="overflow-hidden cards" v-for="i in prices" :key="i.id">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-body :title="'Price in '+i.currency">
            <b-card-text>
              What would be the price in <b>{{i.currency}}</b> for <b>{{i.products.toString().replaceAll(',',', ')}}</b> with <b>{{i.users}}{{i.extra}}?</b>
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
          <b-card-img src="/img/dollar.jpeg" alt="Image" style="height:100%;" class="rounded-0"></b-card-img>
        </b-col>
      </b-row>
    </b-card>

  
  </div>
</template>

<script>
import ExchangeRates from '@/components/ExchangeRates.vue'


export default {
  name: 'PriceQuotes',
  props: {
    
  },
  components: {
    ExchangeRates
  },
  computed: {
    
  },
  data(){
    return{
      prices:[
        {id:0, users:"250 users", products:["Lifecycle", "Repository Manager", "Firewall"],      extra:" and a Nexus Foundation Workshop", currency:"Japanese Yen", input:"", answer:"21632075"},
        {id:1, users:"250 users",  products:["Repository Manager", "Lifecycle Foundation"],      extra:" as a leveraged deal with Optiv and Carahsoft as distributor", currency:"Bitcoin", input:"", answer:""},
        {id:2, users:"10 users and 3 applications",  products:["Repository Manager", "Auditor"], extra:"", currency:"Euro", input:"", answer:"3570"},
        {id:3, users:"150 users",  products:["Firewall","Lifecycle"],                            extra:"", currency:"Euro", input:"", answer:""},
        {id:4, users:"100 users", products:["Repository Manager", "Firewall", "Lifecycle"],      extra:" and it is an inbound partner deal with Orasi", currency:"Zambian Kwacha", input:"", answer:"100"},
        {id:5, users:"500 users", products:["Repository Manager","Firewall","Lifecycle"],        extra:" and it is a partner leveraged 9th BIT for a 3 year deal", currency:"Euro", input:"", answer:"100"},
        {id:6, users:"300 nodes", products:["Container"],                                        extra:"", currency:"Bitcoin", input:"", answer:"100"},
        {id:7, users:"30 users", products:["Lifecycle", "Firewall", "Repository Manager","Small IQ", "Container"], extra:" and a Nexus LC/FW Policy Workshop", currency:"Japanese Yen", input:"", answer:"100"},
        {id:8, users:"200 users", products:["Lifecycle", "IAC"],                                 extra:" and it is a Zivra leveraged deal", currency:"Euro", input:"", answer:"100"},
        {id:9, users:"100 users", products:["Lifecycle", "ADP", "IAC"],                          extra:"", currency:"Bitcoin", input:"", answer:"100"},
      ],
      successMessage: "",
      exchangeRates: false
    }
  },

  mounted() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "hint!";
    }
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
        Firewall: '#8c30c2', //Purple
        RepositoryManager: '#4DBB73', //Green
        Container: '#EC646D', //Pink,
        Lift: '#f7d127',
        IaC: '#999999',
        ADP: '#0F1C4D',
        ALP: '#faa200',
        LifecycleFoundation: '#FF5733', //red
        Auditor: '#10FDB9' //Teal
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
        this.successMessage = "Hooray!"
        window.scroll({
          top: 0, 
          left: 0, 
          behavior: 'smooth'
        });
        this.$store.commit('updateProgress', this.$route.name);
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
  min-height:120vh;
}

.cards{
  width: 80vw;
  max-height:400px;
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


.exchangeRateButton{
  position: absolute;
  top: 20px;
  right:20px;
}

p{
  color: #999999;
}






</style>
