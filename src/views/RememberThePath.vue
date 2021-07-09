<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>

    <h1>Follow The Path</h1>
    <p class="challengeDescription">In this challenge you need to guess the path from the start to the end in order to unlock the hint. Be careful not to guess the wrong space! If you do you will need to cerrectly answer a question to continue.</p>

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

    <br><br><br><br>
    <p class="successMessage">{{successMessage}}</p>
    <br>


     <div class="overlay centerItems" v-if="displayHint">
      <div class="frame">
        <h4>Oops! You didn't guess the right space, answer this question to give it another try, or reset the board.</h4>
        <hr>
        <p>{{hints[hintIndex].hint}}</p>
        <b-input-group class="inputGroup">
          <b-form-input type="text" v-model="hintAnswerSubmission" placeholder="Answer.."></b-form-input>
          <template #append>
            <b-button variant="primary" @click="submitAnswer()">Submit</b-button>
          </template>
        </b-input-group>

        <br>
        <p v-if="hintCorrectOrIncorrect == 'correct'" style="color:green;">Correct!</p>
        <p v-if="hintCorrectOrIncorrect == 'incorrect'" style="color:red;">Sorry, Incorrect!</p>

        <b-button variant="warning" @click="resetPath()">Reset</b-button>
      </div>
    </div>

    <!-- <b-modal id="hintModal" title="Oops! You didn't guess the right space." class="modal" ok-title="Restart" ok-variant="warning" @ok="resetPath()" ok-only>
      <h4>Answer this question to give it another try, or reset the board:</h4>

      <div class="modalContents">
        <p>{{hints[hintIndex].hint}}</p>
        <b-input-group class="inputGroup">
          <b-form-input type="text" v-model="hintAnswerSubmission" placeholder="Answer.."></b-form-input>
          <template #append>
            <b-button variant="primary" @click="submitAnswer()">Submit</b-button>
          </template>
        </b-input-group>

        <br>
        <p v-if="hintCorrectOrIncorrect == 'correct'" style="color:green;">Correct!</p>
        <p v-if="hintCorrectOrIncorrect == 'incorrect'" style="color:red;">Sorry, Incorrect!</p>
      </div>
    </b-modal> -->

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
        ["done",0,0,0,0,0,0,0],
        [0,1,0,5,0,0,0,0],
        [2,3,4,0,6,7,0,0],
        [0,0,0,0,0,8,9,0],
        [0,0,0,13,12,11,10,0],
        [0,0,15,14,0,0,0,0],
        [0,16,0,18,0,20,21,0],
        [0,0,17,0,19,0,22,23],
      ],
      nextStep: 1,
      tableLoad: true,
      successMessage:"",

      displayHint: false,
      hintDone: false,
      hintIndex:0,
      hintAnswerSubmission:"",
      hints:[
        {hint:"hint1", answer:"aaaa"},
        {hint:"hint2", answer:"ssss"},
        {hint:"hint3", answer:"ddddd"},
      ],
      hintCorrectOrIncorrect:""
      
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

    checkPath: function(i,j) {
      let step = this.path[i][j];
      if(this.nextStep == step || step == "done"){
        if(this.nextStep == step){
          this.hintDone = false;
          this.path[i][j] = "done";
          this.nextStep++;

          this.tableLoad = false;
          this.tableLoad = true;
          if(this.path[7][7] == "done"){
            this.successMessage = "HINT";
            this.$store.commit('updateProgress', this.$route.name);
          }
        }

      }else{
        this.displayHint = true;
        // this.$bvModal.show("hintModal");  
      }
    },

    submitAnswer: function(){
      let reset = false;
      if( this.hintAnswerSubmission.length>2 && 
          this.hintDone == false &&
          this.hints[this.hintIndex].answer.includes(this.hintAnswerSubmission)){
        this.hintDone = true;
        this.hintCorrectOrIncorrect = "correct";
      }else{
        reset = true;
        this.hintCorrectOrIncorrect = "incorrect";
      }

      let that = this;
      setTimeout(function(){
        // that.$bvModal.hide("hintModal"); 
        that.displayHint = false;
        if(reset == true){
          that.resetPath();
        }

        that.hintCorrectOrIncorrect = "";
        that.hintAnswerSubmission = ""
        if(that.hintIndex < that.hints.length-1){
          that.hintIndex++;
        }else{
          that.hintIndex = Math.floor(Math.random() * that.hints.length);
        }
      }, 2000);
      
    },


    resetPath: function(){
      document.getElementById("pathTable").setAttribute("style", "background-color: red;");
      this.displayHint = false;
      this.nextStep = 1;
      this.path = [
        ["done",0,0,0,0,0,0,0],
        [0,1,0,5,0,0,0,0],
        [2,3,4,0,6,7,0,0],
        [0,0,0,0,0,8,9,0],
        [0,0,0,13,12,11,10,0],
        [0,0,15,14,0,0,0,0],
        [0,16,0,18,0,20,21,0],
        [0,0,17,0,19,0,22,23],
      ];
      this.tableLoad = false;
      this.tableLoad = true;

      setTimeout(function(){
        document.getElementById("pathTable").setAttribute("style", "background-color: white;");
      }, 300);
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
