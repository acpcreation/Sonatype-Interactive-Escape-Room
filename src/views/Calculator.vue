<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Calculator Challenge</h1>
    <p>In this challenge you will calculate the answer to the various equations below. Each of these equations require different mathematical priciples to determine the correct answer.</p>

    <div class="centerItems">
      <CalculatorPane v-for="i in panes" :key="i.id" :id="i.id" :title="i.title" :hint="i.hint" :equation="i.equation" />

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
      panes:[
        {id:1, title:"Binary Math", hint:"In binary math there are only 1's and 0's. So for example 01 + 01 = 10.", equation:{num1:100, num2:100, operator:"+", answer:"1"} },
        {id:2, title:"Hexidecimal Math", hint:"Hexadecimal digits include (in order): 1,2,3,4,5,6,7,8,9, A(10), B(11), C(12), D(13), E(14), F(15). So for example 4A6 + 1B3 = 659.", equation:{num1:"1A8F", num2:"1A8F", operator:"+", answer:"1"} },
        {id:3, title:"Fibonacci Number", hint:"Each number in the sequence is the sum of the two numbers that precede it. So, the sequence goes: 0, 1, 1, 2, 3, 5..", equation:{num1:"Fibonacci", num2:32, operator:"n =", answer:"1"} }
      ]
      
    }
  },

  mounted() {

  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },




  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding: 5vw;
}







</style>
