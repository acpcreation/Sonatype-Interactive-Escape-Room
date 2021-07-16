<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Family Feud</h1>
    <p class="challengeDescription">In this challenge you need to fill out all of the answers for each question to unlock the escape clue.</p>

    <!-- ADD:
          - Flipping Cards
          - Noise
          - Lightbulb dot grid in background
          - Multiple rounds
     -->

    
    <p class="question">{{currentQuestion.question}}</p>
    <div class="flexView">
      <div class="answerOptions" v-for="i in 8" :key="i">
        <!--  :class="flipCard(i-1)" https://www.w3schools.com/howto/howto_css_flip_card.asp-->
        <span class="answerDisplay"
        v-if="submissions.includes(currentQuestion.answers[i-1])"
        >{{currentQuestion.answers[i-1]}}</span>
        <span class="numberDisplay" v-else-if="currentQuestion.answers[i-1]">{{i}}</span>
      </div>
    </div>

      <b-input-group class="inputGroup">
        <b-form-input type="text" v-model="answer" placeholder="Answers..." :disabled="successMessage.length>1"></b-form-input>
        <template #append>
          <b-button variant="success" @click="submitAnswer" :disabled="successMessage.length>1">Submit</b-button>
        </template>
      </b-input-group>
      
    <p class="successMessage">{{successMessage}}</p>

    <b-button variant="outline-warning" @click="newRound()" v-if="successMessage.length >1 && questionIndex < questions.length-1">New Round</b-button>


  </div>
</template>

<script>
export default {
  name: 'FamilyFeud',
  props: {
    
  },
  components: {

  },

  data(){
    return{
      questions:[
        {question:"We surveyed 100 sales guides in Highspot: For which Sonatype products might you expect a security persona to act as a primary buyer?",                answers:["ADP","Container","Lift","Lifecycle","IaC","Firewall"]},
        {question:"We surveyed 100 sales guides in Highspot: For which Sonatype products might you expect a Dev/Engineering Manager persona to act as a primary buyer?", answers:["ALP", "ADP", "Lift", "Repository", "Lifecycle"]},
        {question:"We surveyed 100 sales guides in Highspot: For which Sonatype products might you expect an Operations persona to act as a primary buyer?",             answers:["Container", "IaC"]},
        {question:"We surveyed 100 sales guides in Highspot: For which Sonatype products might you expect a developer/engineer to act as an primary influencer?",        answers:["ALP", "ADP", "Firewall", "Repository", "Lifecycle"]},
        // {question:"", answers:[""]},
      ],

      hints:[
        "hint1",
        "hint2",
        "hint3",
        "hint4",
      ],

      currentQuestion:{},
      questionIndex: 0,
      submissions:[],
      successMessage:"",
      answer:""
    }
  },

  created() {
    this.currentQuestion = this.questions[this.questionIndex];
  },

  mounted() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "complete!";
      this.questionIndex = this.questions.length-1
      this.currentQuestion = this.questions[this.questions.length-1];
      this.submissions = this.currentQuestion.answers;
    }

    this.addCharacterListeners();
  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    submitAnswer: function(){
      this.answer = this.answer.toUpperCase()
      for(let i in this.currentQuestion.answers){
        let option = this.currentQuestion.answers[i].toUpperCase()

        if(option.includes(this.answer) && this.answer.length >2){
          if(!this.submissions.includes(this.currentQuestion.answers[i])){
            this.submissions.push(this.currentQuestion.answers[i])
          }
          break;
        }
      }
      this.answer = "";

      if(this.submissions.length == this.currentQuestion.answers.length){
        if(this.questionIndex < this.questions.length-1){
          this.successMessage = "Hint";
        }else{
          this.$store.commit('updateProgress', this.$route.name);
          this.successMessage = "Complete!"
        }
      }

    },

    addCharacterListeners: function(){
      window.addEventListener('keydown', (e) => {
        if(e.key == 'Enter'){
          this.submitAnswer()
        }
      });
    },

    newRound:function(){
      this.submissions = [];
      this.successMessage = "";
      this.questionIndex +=1;
      this.currentQuestion = this.questions[this.questionIndex];
    }

    // flipCard: function(i){
    //   if(this.submissions.includes(this.currentQuestion.answers[i])){
    //     return "flip"
    //   }else{
    //     return ""
    //   }
    // }




  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding: 2vw;
}

.flexView{
  margin:0px auto;
  display: flex;
  flex-direction:column;
  flex-wrap: wrap;
  justify-content:center;
  border: solid 4px rgb(255, 208, 0);
  border-radius: 30px;
  padding:15px;
  background-color: black;
  height:290px;
  width: 646px;
}

.answerOptions{
  text-align: center;
  color: white;
  font-size: 30px;
  width:300px;
  background-image: radial-gradient(rgb(0, 171, 214),rgb(13, 31, 194)); 
  font-weight: bold;
  border: solid 3px rgb(172, 172, 172);
  text-transform:uppercase;
  margin:2px;
  padding-top:4px;
  height:55px;
  border-radius: 2px;
}
/* 
.flip{
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transform: rotateX(180deg);
  transition: transform 0.6s;
  transform-style: preserve-3d;
} */

.inputGroup{
  margin: 10px auto; 
  width:50vw;
  margin-top:40px;
}

.inputGroup input{
  text-align: center;
}

.question{
  margin-top: 25px;
  font-size: 30px;
  color:rgb(255, 208, 0);
  font-weight:bold;
  font-size: 30px;
}








</style>
