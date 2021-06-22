<template>
  <div class="main centerItems">
    <div class="frame">
      <h2>AUDIT</h2>
      <p>You are being audited. In order to complete the rest of the challenges and solve the passcode we need you to.. LIST 20 OF THE TOP LICENSE TYPES THAT SONATYPE SUPPORTS??</p>

      
      <b-form-input class="input"
                    v-for="(i, index) in inputs" 
                    :key="index" 
                    v-model="inputs[index]" 
                    :state="checkInputs(index)"
                    :placeholder="'License #'+(index+1)"></b-form-input>

      <p class="successMessage">{{successMessage}}</p>
      <b-button variant="warning" v-if="successMessage.length>1" @click="closeAudit()">Complete Audit and Close</b-button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Audit',
  props: {

  },
  data(){
    return{
      inputs: ["", "", ""],
      inputValidation:[],
      successMessage: ""
    }
  },

  mounted: function(){
    for(let i=0; i<this.inputs.length;i++){
      this.inputValidation.push(false)
    }
  },

  methods:{

    closeAudit: function() {
      this.$emit("closeAudit");
    },

    checkInputs: function(index) {

      let validEntry = false;
      if(this.inputValidation[0] == false || 1==1){
        validEntry = true;
      }

      if(validEntry == true){
        let noDuplicates = this.checkForDuplicates(this.inputs, index)
        if(noDuplicates == true ){
          this.inputValidation[index] = true;

          if(this.inputValidation.includes(false) == false){
            // console.log("SUCCESS")
            this.successMessage = "Great Job! You know your stuff!";
          }else{
            this.successMessage = "";
          }
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    },


    checkForDuplicates: function(list, index) {
      let noDuplicates = true;
      for(let i in list){
        if(index != i && list[i] == list[index]){
          noDuplicates = false;
          break;
        }
      }

      if(list[index].length<=1){
        noDuplicates = false;
      }
      return noDuplicates;
    }



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.main{
  position:fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background-color: rgba(22, 22, 22, 0.80);
  z-index: 100;
}

h2, p{
  color: black;
}

.frame{
  width:60vw;
  /* height:50vh; */
  margin-top: 8vh;
  background-color:white; 
  border-radius: 10px;
  text-align: center;  
  padding: 20px;
}

.input{
  width: 30vw;
  margin: 15px auto;
  text-align: center;
}




</style>
