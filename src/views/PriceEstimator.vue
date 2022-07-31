<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Price Estimastor</h1>
    <p class="challengeDescription">Use the slider to guess if the price is closer to the option on the left or the option on the right. The closer the slider is to the answer the more points you get.</p>
    
    <p class="successMessage">{{successMessage}}</p>


    <b-card no-body class="overflow-hidden cards" v-for="i in prices" :key="i.id" >
      <b-row no-gutters>
        <b-col md="6">
          <b-card-body :title="'Price in ...'">
            <b-card-text>
              {{i.question}}
            </b-card-text>


            <b-container fluid>
              <b-row class="my-1">
                <b-col sm="1">
                  <font-awesome-icon icon="fa-solid fa-ship" />
                </b-col>
                <b-col sm="10">
                  <b-form-input v-model="i.submission" type="range" min="0" max="5" step="0.5"></b-form-input>
                </b-col>
                <b-col sm="1">
                  <font-awesome-icon icon="fa-solid fa-ship" />
                </b-col>
              </b-row>
            </b-container>

            <br>
            <span  class="pill" style="background-color:#479FDC">
              {{i.submission}}
            </span>

            <!-- <div class="pillContainer">
              <span  class="pill" 
                    v-for="j in i.products" 
                    :key="j+i.id"
                    :style="'background-color:'+pillColors(j)">
                {{j}}
              </span>
            </div> -->

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
export default {
  name: 'PriceEstimator',
  props: {
    
  },
  components: {
  },
  computed: {
    
  },
  data(){
    return{
      prices:[
        {id:0, low:"", lowIcon:"", high:"", highIcon:"", answer:"", submission:0, question:"lorem ipsum................."},
      ],

      successMessage: "",
    }
  },

  mounted() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "Clue: We know this is something we have to get done, but we have to be able to make it work with our budget. Will we be able to get a portion of your tools or do we have to buy it all together?";
      for(let i in this.prices){
        this.prices[i].input = this.prices[i].answer;
      }
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

      if(correct == this.prices.length && this.successMessage.length<1){
        this.successMessage = "Clue: We know this is something we have to get done, but we have to be able to make it work with our budget. Will we be able to get a portion of your tools or do we have to buy it all together?"
        window.scroll({
          top: 0, 
          left: 0, 
          behavior: 'smooth'
        });
        this.$store.commit('updateProgress', {route:this.$route.name, context:this, score:1000});
      }
    }



  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main{
  text-align: center;
  padding-top: 3vh;
  /* height:100vh; */
  /* overflow:scroll; */
  /* margin-bottom:-80px; */
  background-image: linear-gradient(to bottom, rgba(22, 22, 22, 0.88),rgba(0, 0, 0, 0.88)), 
                    url('../../public/img/background.svg');
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
  font-size: 24px;
}


.exchangeRateButton{
  position: absolute;
  top: 20px;
  right:20px;
  z-index: 100;
}

p{
  color: #999999;
}

a{
  color: rgb(0, 174, 255) !important;
}






</style>
