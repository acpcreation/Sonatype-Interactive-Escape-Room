<template>
  <div class="calculationPane">
    <h3>{{title}}</h3>

    <b-button v-b-toggle="'collapse-'+id" variant="primary">Show Hint</b-button>
    <b-collapse :id="'collapse-'+id" class="mt-2">
      <b-card>
        <p class="card-text">{{hint}}</p>
      </b-card>
    </b-collapse>

    <div class="equation">
      <p>{{equation.num1}}</p>
      <p><b>{{equation.operator}}</b> &nbsp; {{equation.num2}}</p>
    </div>
    <b-form-input type="text" class="equationInput" :state="inputState" v-model="resultInput"></b-form-input>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    id: Number,
    title: String,
    hint: String,
    equation: Object
  },
  computed: {
    inputState() {
      // console.log(this.resultInput +"=="+ this.equation.answer)
      if(this.resultInput == this.equation.answer){
        // this.$emit("closePasscode");
        return true;
      }else{
        return null;
      }
    }
  },
  data(){
    return{
      resultInput:"",
    }
  },

  mounted: function(){
  },

  methods:{
    checkAnswer:function(){
      
    },



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.calculationPane{
  width: 280px;
  background-color: white;
  border-radius: 10px;
  padding: 15px 0px;
  margin:25px;
}

h3{
  color:black;
  margin-bottom:15px;
  font-size: 24px;
}

p{
  color:black;
}

.equation{
  width: 100px;
  margin-left:auto;
  margin-right:auto;
  text-align: right;
  border-bottom:solid 2px black;
  margin-top:25px;
}

.equation p{
  margin:0;
}
 
.equationInput{
  margin:5px auto;
  width:100px;
  border-radius: 6px;
  text-align: right;
}

.card-text{
  text-align: left;
}



</style>
