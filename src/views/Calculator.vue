<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Calculator Challenge</h1>
    <p class="challengeDescription">In this challenge you will calculate the answer to the various equations below. Each of these equations require different computing and mathematical priciples to determine the correct answer.</p>

    <!-- <p>*** Word problems, discrete math ***</p> -->
    <p class="successMessage">{{successMessage}}</p>


    <div class="centerItems">
      <CalculatorPane 
        v-for="i in calculations" 
        :key="i.id" 
        :id="i.id" 
        :title="i.title" 
        :hint="i.hint" 
        :equation="i.equation" 
        :allCompleted="allCompleted"
        @updateCompleted="updateCompleted($event)" />

    </div>

    <h1 class="h1Score">{{('00000'+score).slice(-5)}}</h1>
   

  </div>
</template>

<script>
import CalculatorPane from '@/components/CalculatorPane.vue'

export default {
  name: 'Calculator',
  props: {
    
  },
  components: {
    CalculatorPane
  },
  data(){
    return{
      successMessage:"",
      calculations:[
        {id:1, title:"Binary Math", hint:"In binary math there are only 1's and 0's. So for example 01 + 01 = 10.", equation:{num1:1001100, num2:1100101, operator:"+", answer:"10110001"} },
        {id:2, title:"Big O Notation", hint:"Use N to represent the problem size.", equation:{num1:"Quadratic time as Big O.", num2:"", operator:"", answer:"O(N^2)"} },
        {id:3, title:"Hexadecimal Math", hint:"Hexadecimal is a base 16 number system. The following letters represent numbers over 9: A=10, B=11, C=12, D=13, E=14, F=15.", equation:{num1:"5C1", num2:"76A", operator:"+", answer:"D2B"} },
        {id:4, title:"Big O Notation", hint:"What is the runtime complexity of the following function?\nHint: Use N to represent the problem size.\n\nint a = 0;\nfor (i = 0; i < N; i++) {\n\xa0\xa0for (j = N; j > 0; j--) {\n\xa0\xa0\xa0\xa0a = a + i + j;\n\xa0\xa0}\n}", equation:{num1:"See hint", num2:"", operator:"", answer:"O(N^2)"} },
        {id:5, title:"Virtual Memory", hint:"Answer as an exponent.\nGB = 2^30\nKB = 2^10\nX^T / X^R = X^(T-R)", equation:{num1:"Number of pages?", num2:"Page Table = 1GB, Page = 1KB", operator:"", answer:"2^20"} },
        {id:6, title:"Fibonacci", hint:"Each number in the sequence is the sum of the two numbers that precede it. The first two numbers are 0, 1.", equation:{num1:"f(n) = f(n-1) + f(n-2)", num2:"?", operator:"f(8)=", answer:"21"} }

      ],

      completed:[],
      allCompleted: false,
      scoreInterval:null,
      score:1000
      
    }
  },

  created() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "Complete!";
      this.allCompleted = true
    }else{
      let that = this;
      setTimeout(function(){
        that.scoreInterval = setInterval(function(){
          that.score -= 1;
        }, 3000)
      }, 5000);
    }
  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    updateCompleted:function(e){
      if(!this.completed.includes(e)){
        this.completed.push(e);
      }

      if(this.completed.length == this.calculations.length){
        clearInterval(this.scoreInterval)
        this.successMessage = "Complete!";
        this.$store.commit('updateProgress', {route:this.$route.name, context:this, score:1000});
      }
    },





  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding: 2vw 8vw;
  background-image: linear-gradient(to bottom, rgba(22, 22, 22, 0.88),rgba(0, 0, 0, 0.88)), 
                    url('../../public/img/background.svg');
  min-height: 100vh;
  background-size: cover;
  overflow: hidden;
}

.centerItems{
  flex-wrap: wrap;
}








</style>
