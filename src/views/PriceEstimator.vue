<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Higher-Lower</h1>
    <p class="challengeDescription">Use the slider to guess if the value is closer to the option on the left or the option on the right. The closer the slider is to the correct answer the more points you get.</p>
    
    <p class="successMessage">{{successMessage}}</p>


    <b-card no-body class="overflow-hidden cards" v-for="(i, index) in prices" :key="i.answer" >
      <b-row no-gutters>
        <b-col md="6">
          <b-card-body :title="i.question">
            <!-- <b-card-text>
              {{i.question}}
            </b-card-text> -->


            <b-container fluid>
              <b-row class="rageSlider">
                <b-col sm="1">
                  <!-- <font-awesome-icon :icon="i.lowIcon" />  -->
                  <p> {{i.low}}</p>
                </b-col>
                <b-col sm="10">
                  <b-form-input v-model="i.submission" type="range" :min="i.low" :max="i.high" :step="i.step" :disabled="i.complete"></b-form-input>
                </b-col>
                <b-col sm="1">
                  <p> {{i.high}}</p>
                </b-col>
              </b-row>
            </b-container>

            <div  class="pill">
              <font-awesome-icon :icon="i.icon" /> {{i.submission}} {{i.append}}
            </div>

            <!-- <div class="pillContainer">
              <span  class="pill" 
                    v-for="j in i.products" 
                    :key="j+i.id"
                    :style="'background-color:'+pillColors(j)">
                {{j}}
              </span>
            </div> -->
            
            <div>
              <b-button variant="primary" @click="submitScore(index)" :disabled="i.complete">Submit</b-button> 
              <span class="cardScore" v-if="i.complete == true" >Score: {{i.finalScore}}</span>
            </div>
            <p v-if="i.complete == true" style="margin:10px;"> Correct Answer: <b><u>{{i.answer}}</u></b>. {{i.answerText}}</p>

          </b-card-body>
        </b-col>
        <b-col md="6">
          <!-- <font-awesome-icon :icon="i.icon" class="dollarIcon" />  -->
          <b-card-img src="/img/dollar.jpeg" alt="Image" style="height:100%;" class="rounded-0"></b-card-img>
        </b-col>
      </b-row>

    </b-card>

    <h1 class="h1Score" v-if="score>=0">{{('00000'+score).slice(-5)}}</h1>
    <h1 class="h1Score" v-else>{{score}}</h1>
  
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
        {icon:"fa-ship", low:300, high:500,  submission:400,  answer:450, append:"Billion Dollars", step:10, question:"Which industry has a larger dollar evaluation? The drug trade or cybercrime?", answerText:"Cyber crime profits $450 Billion each year while the drug trade only profits $435 Billion.", complete:false, finalScore:0},
        {icon:"fa-ship", low:.25, high:3,    submission:1.6,  answer:1,   append:"Dollars", step:.25, question:"What costs more to buy in the US: A malware installation kit or a pack of gum?", answerText:"A malware kit cost $1.00 on the dark web vs $1.49 for gum.", complete:false, finalScore:0},
        {icon:"fa-ship", low:200, high:2000, submission:1100, answer:1500, append:"Percent", step:100, question:"By what percentage has Cybercrime grown since 2016?", answerText:"Cybercrime is the fastest growing illegal activity on the planet and has grown by 1500% to over $6 Trillion.", complete:false, finalScore:0},
        {icon:"fa-ship", low:18,  high:1000, submission:518,  answer:18,   append:"Million Dollars", step:50, question:"Average cost of attack on the banking industry per incident vs. the cost John Sherman paid to buy the Royals in 2019?", answerText:"Banking industry cost per incident is $18.37 Million vs. $1 Billion for the Royals.", complete:false, finalScore:0},
        {icon:"fa-ship", low:36,  high:212,  submission:138,  answer:196, append:"Days", step:16, question:"Average days it takes for a data breach to be detected vs days it took the Kon-Tiki expedition to travel by raft from South America to Polynesia?", answerText:"Average time to discover a data breach is 196 days vs. 101 day rafting from South America to Polynesia.", complete:false, finalScore:0},
        {icon:"fa-ship", low:10,  high:60,   submission:35,   answer:25,  append:"Percent", step: 5, question:"Percent of Americans who don’t know smart devices can be hacked vs. the percent of Americans who have never left the state they were born in?", answerText:"25% of Americans don’t know their phones can be hacked vs 11% who have never left their home state.", complete:false, finalScore:0},

        // {icon:"fa-ship", low:0, high:0, submission:0, answer:0, append:"", step: 0, question:"", answerText:"", complete:false, finalScore:0},
      ],

      successMessage: "",
      score:0
    }
  },

  created(){
    this.prices = this.shuffleArray(this.prices)
  },

  mounted() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "Complete!";
      for(let i in this.prices){
        this.prices[i].complete = true;
      }
    }

  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    shuffleArray: function(eArray){
      var i, j, k;
      for (i = eArray.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        k = eArray[i];
        eArray[i] = eArray[j];
        eArray[j] = k;
      }
      return eArray;
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
        if(this.prices[i].complete == true){
          correct++;
        }
      }

      if(correct == this.prices.length && this.successMessage.length<1){
        this.successMessage = "Complete!"
        window.scroll({
          top: 0, 
          left: 0, 
          behavior: 'smooth'
        });
        this.$store.commit('updateProgress', {route:this.$route.name, context:this, score:this.score});
      }
    },




    submitScore: function(i){
      this.prices[i].complete = true; //Disable stuff
      let submission = this.prices[i].submission;
      let answer = this.prices[i].answer;
      let rawScore = 0;
      if(submission < answer){
        rawScore = answer-submission;
      }else{
        rawScore = submission - answer;
      }

      rawScore = rawScore/this.prices[i].step;
      rawScore = 200 - rawScore*15;
      this.score += rawScore;
      this.prices[i].finalScore = rawScore;

      this.checkAllPricesCorrect();
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
  margin-top:50px;
  margin-bottom: 20px;
}

.pill{
  border-radius:25px;
  margin: 10px auto 20px auto;
  padding: 5px 12px;
  /* cursor: pointer; */
  color:white;
  text-align: center;
  font-size: 24px;
  background-color:#053a60;
  width: 300px;
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

.rageSlider{
  margin-top:20px;
}

.rageSlider p{
  white-space:nowrap;
  font-size: 20px;
  margin-top:-2.5px;
  margin-bottom:0px;
  /* margin-left: -2px; */
}

.dollarIcon{
  font-size: 80px;
  color:rgb(84, 20, 103);
  margin-top: 100px; 
  margin-bottom: -50px;
  margin-left: 42%;
  z-index: 1000;
}

.cardScore{
  margin-left:60%;
  font-size:20px;
  font-weight: bold;
  color:goldenrod;
}





</style>
