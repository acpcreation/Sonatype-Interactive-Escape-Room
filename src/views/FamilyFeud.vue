<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Family Feud</h1>
    <p>In this challenge you need to...</p>

    <!-- ADD:
          - Flipping Cards
          - Noise
          - Lightbulb dot grid in background
          - Multiple rounds
          - Enter button to submit answers
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
        <b-form-input type="text" v-model="answer" placeholder="Answers..."></b-form-input>
        <template #append>
          <b-button variant="success" @click="submitAnswer">Submit</b-button>
        </template>
      </b-input-group>
      


    <p class="successMessage">{{successMessage}}</p>

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
        {question:"Insert Question Here", answers:["snyk","challenge","your","means","question","this"]}
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

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    submitAnswer: function(){
      for(let i in this.currentQuestion.answers){
        let answer = this.currentQuestion.answers[i]
        if(this.answer.includes(answer)){
          this.submissions.push(answer)
          break;
        }
      }
      this.answer = "";
    },

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
