<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>

    <h1>Follow The Path</h1>
    <p class="challengeDescription">In this challenge you need to guess the path from the start to the end in order to unlock the escape clue. Be careful not to guess the wrong space! If you do you will need to correctly answer a question to continue.</p>

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
      path:[
        ["done",0,0,0,0,0,0 ],
        [0,1 ,0 ,5 ,0 ,0 ,0 ],
        [2,3 ,4 ,0 ,6 ,7 ,0 ],
        [0,0 ,0 ,0 ,0 ,8 ,9 ],
        [0,0 ,0 ,13,12,11,10],
        [0,0 ,14,0 ,0 ,17,0 ],
        [0,0 ,0 ,15,16,0 ,18],
      ],
      // path:[
      //   ["done",0,0,0,0,0,0,0],
      //   [0,1,0,5,0,0,0,0],
      //   [2,3,4,0,6,7,0,0],
      //   [0,0,0,0,0,8,9,0],
      //   [0,0,0,13,12,11,10,0],
      //   [0,0,15,14,0,0,0,0],
      //   [0,16,0,18,0,20,21,0],
      //   [0,0,17,0,19,0,22,23],
      // ],
      nextStep: 1,
      tableLoad: true,
      successMessage:"",
      isDisabled: false,
      displayHint: false,
      hintDone: false,
      hintIndex:0,
      hintAnswerSubmission:"",
      hints:[
        {hint:"What competitor allows policies to be created for both SAST and OSA based on licenses, aging and vulnerability data; also has the ability to break builds on policy violations and thresholds (number of vulnerabilities by category). ", answer:"CheckMarx"},
        {hint:"What competitor is well known by legal personas; typically win when legal departments lead evaluation/purchase decisions.", answer:"Synopsys Black Duck"},
        {hint:"What competitor has component information pulled into their ‘hub’ to generate reports; these reports require manual follow-up for remediation (automating process, but not policy).", answer:"Synopsys Black Duck"},
        {hint:"Name one of the 4 top competitors who identify components via a name-based search, instead of a hash-based unique fingerprint, resulting in large quantities of false positives/negatives. ", answer:"Synopsys Black Duck, Snyk, JFrog, WhiteSource"},
        {hint:"What competitor, when positioning themselves with customers, tend to use terms like “radically universal”, “end to end devops platform” and “full artifact lifecycle”. ", answer:"JFrog"},
        {hint:"Name one of the 3 top competitors we lose deals to due to call flow analysis.", answer:"Snyk, Veracode, Whitesource"},
        {hint:"Name the competitor we often clash with as a repo-centric solution provider.", answer:"JFrog"},
        {hint:"Which competitor also takes a BOM approach to OSS license obligations?", answer:"Whitesource"},
        {hint:"Name one of our competitors who also has a licensing model that is per developer?", answer:"Synopsys Black Duck, Whitesource, Snyk"},
        {hint:"When competing with NXRM, this competitor’s SaaS solution charges on peak usage resulting in a higher cost per month. ", answer:"JFrog"},
        {hint:"Which competitor has a plugin called gatekeeper?", answer:"Snyk"},
        {hint:"Name the competitor who we consider to be a “check-the-box” offering in contrast to ALP.", answer:"Fossa"},
        {hint:"Name a competitor who we compete with in the code quality analysis space (competing with sonatype Lift)?", answer:"SonarCloud, SonarQube, Github, Gitlab, Snyk"},
        {hint:"Name one of the public data sources Sonatype monitors for new vulnerabilities?", answer:"National Vulnerability Database (NVD), Github Events, Security Advisory Websites, Open Source Project Websites"},
        // {hint:"", answer:""},

      ],
      hintCorrectOrIncorrect:""
      
    }
  },

  mounted() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "Clue: We need a way to proactively block or allow components for use by our development teams that are consistent with our company policies...but not all teams have the same requirements. We used to keep a list of the 'good' and 'bad' components, but that is no longer working.";
      document.getElementById("pathTable").setAttribute("style", "pointer-events:none");

      for(let i in this.path){
        for(let j in this.path[i]){
          if(this.path[i][j] != 0){
            this.path[i][j] = "done"
          }
        }
      }
    }
    
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
          if(this.path[6][6] == "done"){
            this.successMessage = "Clue: We need a way to proactively block or allow components for use by our development teams that are consistent with our company policies...but not all teams have the same requirements. We used to keep a list of the 'good' and 'bad' components, but that is no longer workin";
            document.getElementById("pathTable").setAttribute("style", "pointer-events:none");
            this.$store.commit('updateProgress', {route:this.$route.name, context:this, score:1000});
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

      if( this.hintAnswerSubmission.length>=3 && 
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
      this.path = [
        ["done",0,0,0,0,0,0 ],
        [0,1 ,0 ,5 ,0 ,0 ,0 ],
        [2,3 ,4 ,0 ,6 ,7 ,0 ],
        [0,0 ,0 ,0 ,0 ,8 ,9 ],
        [0,0 ,0 ,13,12,11,10],
        [0,0 ,14,0 ,0 ,17,0 ],
        [0,0 ,0 ,15,16,0 ,18],
      ];
      this.tableLoad = false;
      this.tableLoad = true;

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
  margin-right: 4px;
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
}

@media (min-width: 800px) {
  .tableContainer{
    margin-top: 150px;
    transform: scale(1.5);
  }
}






</style>
