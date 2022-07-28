<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Calculator Challenge</h1>
    <p class="challengeDescription">In this challenge you will calculate the answer to the various equations below. Each of these equations require different mathematical priciples to determine the correct answer.</p>

    <!-- <p>*** Word problems, discrete math ***</p> -->
    <p class="successMessage"><a href="https://photos.app.goo.gl/hH4xnVTjPSCU85Vp6" target="_blank">{{successMessage}}</a></p>


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
        {id:2, title:"Fibonacci Number", hint:"Each number in the sequence is the sum of the two numbers that precede it. So, the sequence goes: 0, 1, 1, 2, 3, 5..", equation:{num1:"Fibonacci", num2:25, operator:"n =", answer:"75025"} },
        {id:3, title:"Patterns", hint:"Given the numbers what should be the next logical number in the sequence?", equation:{num1:"159, 147, 134, 120", num2:"", operator:"..?", answer:"105"} },
        {id:4, title:"Analogy", hint:"Different numbers can relate to eachother. In this case what number would best complete the analogy?", equation:{num1:"8:4 as 10:", num2:"", operator:"X", answer:"5"} },
        {id:5, title:"Quadratics", hint:"Remember the \"order of operations\" and solve for x.", equation:{num1:"8((x^2)-1)-6x(x-3)-18x", num2:"", operator:"= 0", answer:"2"} },
        // {id:2, title:"Hexidecimal Math", hint:"Hexadecimal digits include (in order): 1,2,3,4,5,6,7,8,9, A(10), B(11), C(12), D(13), E(14), F(15). So for example 4A6 + 1B3 = 659.", equation:{num1:"1A8F", num2:"1A8F", operator:"+", answer:"1"} },
      ],

      completed:[],
      allCompleted: false
      
    }
  },

  created() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "Clue: Click HERE to see a Post-It that might help you!";
      this.allCompleted = true
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
        this.successMessage = "Clue: Click HERE to see a Post-It that might help you!";
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
}

.centerItems{
  flex-wrap: wrap;
}








</style>
