<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>

    <h1>Follow The Path</h1>
    <p class="challengeDescription">In this challenge you need to guess the path from the start to the end in order to unlock the escape clue. Be careful not to guess the wrong space! If you do you will need to correctly answer a question to continue or have to restart and lose points!</p>

    <p class="successMessage">{{successMessage}}</p>

    <div class="tableContainer">
      <p class="start">Start</p>
      <table id="pathTable" v-if="tableLoad">
        <tr v-for="(i, indexi) in path" :key="indexi">
          <td v-for="(j, indexj) in i" :key="indexj" @click="checkPath(indexi, indexj)">
            <b-icon v-if="path[indexi][indexj] == 'done'" icon="check-circle-fill" font-scale="2" variant="success"></b-icon>
            <b-icon v-else icon="x-circle" font-scale="2" variant="dark"></b-icon>

          </td>
        </tr>
      </table>
      <p class="finish">Finish</p>
    </div>
    
    <br>


    <div class="overlay centerItems" v-if="displayHint">
      <div class="frame">
        <h4>Oops! You didn't guess the right space, answer this question to give it another try, or reset the board.</h4>
        <hr>
        <p>{{hints[hintIndex].hint}}</p>
        <b-input-group class="inputGroup">
          <b-form-input type="text" v-model="hintAnswerSubmission" placeholder="Answer.." :disabled='isDisabled'></b-form-input>
          <template #append>
            <b-button variant="primary" @click="submitAnswer()" :disabled='isDisabled'>Submit</b-button>
          </template>
        </b-input-group>

        <br>
        <p v-if="hintCorrectOrIncorrect == 'correct'" style="color:green;">Correct: {{hints[hintIndex].answer}}</p>
        <p v-if="hintCorrectOrIncorrect == 'incorrect'" style="color:red;">Sorry, Incorrect! Correct answers include: {{hints[hintIndex].answer}}</p>

        <b-button variant="warning" v-if="hintCorrectOrIncorrect != 'correct'" @click="closeModal(true)">Reset</b-button>
        <b-button variant="success" v-if="hintCorrectOrIncorrect == 'correct'" @click="closeModal(false)">Close and Continue</b-button>
      </div>
    </div>

    <h1 class="h1Score">{{('00000'+score).slice(-5)}}</h1>

  </div>
</template>

<script>
export default {
  name: 'RememberThePath',
  props: {
    
  },
  components: {

  },
  data(){
    return{
      // path:[
      //   ["done",0,0,0,0,0,0 ],
      //   [0,1 ,0 ,5 ,0 ,0 ,0 ],
      //   [2,3 ,4 ,0 ,6 ,7 ,0 ],
      //   [0,0 ,0 ,0 ,0 ,8 ,9 ],
      //   [0,0 ,0 ,13,12,11,10],
      //   [0,0 ,14,0 ,0 ,17,0 ],
      //   [0,0 ,0 ,15,16,0 ,18],
      // ],
      path:[],
      orginalPath:[
        ["done",0,0,3,0],
        [0,1,2,0,4],
        [0,0,0,0,5],
        [0,0,0,6,0],
        [0,0,0,0,7]
      ],
      nextStep: 1,
      tableLoad: true,
      successMessage:"",
      isDisabled: false,
      displayHint: false,
      hintDone: false,
      hintIndex:0,
      hintAnswerSubmission:"",
      hints:[
        {hint:"What was the YoY increase in cybersecurity attacks aimed at open source? \n 172%, 210%, 480%, 650%, 835%?", answer:"650%"},
        {hint:"What is the YoY growth of component downloads? \n 73%, 95%, 108%, 120%, 156%?", answer:"73%"},
        {hint:"How many new versions of components were introduced in 2020? \n 300 Thousand, 550 Thousand, 1.2 Million, 4.5 Million, 6 Million?", answer:"6 Million"},
        {hint:"What % of popular projects contain at least 1 known vulnerability? \n 4%, 17%, 29%, 46%, 58%?", answer:"29%"},
        {hint:"Intelligent automation that standardizes engineering could remove how many hours of wasted time world wide? \n 680 Thousand, 1.6 Million, 2.5 Million, 4 Million, 5.1 Million?", answer:"1.6 Million Hours"},
        {hint:"Intelligent automation that standardizes engineering could remove $ _____ in real world waste? \n $1.6 Million, $6 Million, $60 Million, $160 Million, $240 Million?", answer:"$240 Million"},
        {hint:"Intelligent automation could save companies on average $_____ per year? \n $80,000, $192,000, $399,000, $623,000, $1.1 Million?", answer:"$192,000"},
        {hint:"On average, enterprise java applications utilize ____% of all the components that are available for download in Maven central repository. \n 1%, 7%, 13%, 19%, 25%?", answer:"25%"},
        {hint:"How many project versions are available between the Java, Javascript, Python, and .NET ecosystems? \n 37 Million, 129 Million, 546 Million, 862 Million, 1.05 Billion?", answer:"37 Million"},
        {hint:"As of July 2021, between Java, JavaScript, Python, and .NET, which ecosystem saw the most increase in downloads YoY?", answer:"Python at 92%"},
        {hint:"As of July 2021, between Java, JavaScript, Python, and .NET, which ecosystem saw the most annual downloads?", answer:"JavaScript at 1.5 Trillion"},
        {hint:"How many active projects are in Maven Central as of July 2021? \n390,000, 430,000, 568,000, 901,000, 1.07 Million?", answer:"430,000"},
        {hint:"What is the Executive order number that the USA enacted to formalize software supply chain standards? \n14024, 14025, 14026, 14027, 14028?", answer:"14028"},
        // {hint:"", answer:""},
      ],
      hintCorrectOrIncorrect:"",
      score: 1000
      
    }
  },

  mounted() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "Complete!";
      document.getElementById("pathTable").setAttribute("style", "pointer-events:none");

      for(let i in this.path){
        for(let j in this.path[i]){
          if(this.path[i][j] != 0){
            this.path[i][j] = "done"
          }
        }
      }
    }
    this.path = JSON.parse(JSON.stringify(this.orginalPath));
    this.addCharacterListeners();
  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    checkPath: function(i,j) {
      let step = this.path[i][j];
      if(this.nextStep == step || step == "done" ){
        if(this.nextStep == step){
          this.hintDone = false;
          this.path[i][j] = "done";
          this.nextStep++;

          this.tableLoad = false;
          this.tableLoad = true;
          if(this.path[4][4] == "done"){
            this.successMessage = "Complete!";
            document.getElementById("pathTable").setAttribute("style", "pointer-events:none");
            this.$store.commit('updateProgress', {route:this.$route.name, context:this, score:this.score});
          }
        }

      }else{
        if(this.hintDone == false){
          this.displayHint = true;
        }else{
          this.resetPath();
        }
        
        // this.$bvModal.show("hintModal");  
      }
    },

    submitAnswer: function(){
      // let reset = false;
      this.isDisabled = true;
      let answer = this.hints[this.hintIndex].answer.toLowerCase();

      if( this.hintAnswerSubmission.length>=2 && 
          answer.includes(this.hintAnswerSubmission.toLowerCase())){
        this.hintCorrectOrIncorrect = "correct";
      }else{
        // reset = true;
        this.hintCorrectOrIncorrect = "incorrect";
      }
      

      // closeModal(reset);
    },

    closeModal: function(reset){
      let that = this;
      // setTimeout(function(){
        // that.$bvModal.hide("hintModal"); 
        that.displayHint = false;
        if(reset == true){
          that.resetPath();
        }
        this.isDisabled = false;
        that.hintCorrectOrIncorrect = "";
        that.hintAnswerSubmission = ""
        if(that.hintIndex < that.hints.length-1){
          that.hintIndex++;
        }else{
          that.hintIndex = Math.floor(Math.random() * that.hints.length);
        }
      // }, 2000);
    },


    resetPath: function(){
      document.getElementById("pathTable").setAttribute("style", "background-color: red;");
      this.displayHint = false;
      this.nextStep = 1;
      this.path = JSON.parse(JSON.stringify(this.orginalPath))
      this.tableLoad = false;
      this.tableLoad = true;
      this.score -=10;

      setTimeout(function(){
        document.getElementById("pathTable").setAttribute("style", "background-color: white;");
      }, 300);
    },


    addCharacterListeners: function(){
      window.addEventListener('keydown', (e) => {
        if(e.key == 'Enter'){
          this.submitAnswer()
        }
      });
    },





  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding: 2vw;
    background-image: linear-gradient(to bottom, rgba(22, 22, 22, 0.88),rgba(0, 0, 0, 0.88)), 
                    url('../../public/img/background.svg');
  min-height: 100vh;
  background-size: cover;
  overflow: hidden;
}

table{
  background-color: white;
  margin:0;
  transition: background-color .3s ease-out;
}

td, th{
  border: 1px solid rgb(44, 44, 44);
}

td{
  width: 50px;
  height:50px;
  cursor: pointer;
}

.start{
  text-align: left;
  margin-bottom: 0px;
  margin-left: 4px;
}

.finish{
  text-align: right;
  margin-right: 20px;
}

.tableContainer{
  width: 400px;
  margin-top: 2vw;
  margin-left:auto;
  margin-right: auto;
}

#hintModal p, h3{
  color: black;
  margin-left: 15px;
}

.overlay{
  position:fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background-color: rgba(22, 22, 22, 0.80);
  z-index: 100;
}

.frame{
  width:40vw;
  margin-top: 20vh;
  background-color:white; 
  border-radius: 10px;
  text-align: center;  
  padding: 20px;
}

.frame p{
  color: black;
  white-space: pre-line; 
}

@media (min-width: 800px) {
  .tableContainer{
    margin-top: 180px;
    transform: scale(1.7);
    padding-left:30px;
  }
}






</style>
