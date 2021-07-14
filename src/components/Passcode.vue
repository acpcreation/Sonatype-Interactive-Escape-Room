<template>
  <div class="main centerItems">
    <div class="screen">
      <b-icon class="closeButton" icon="x-circle-fill" font-scale="2" variant="dark" @click="closePane()"></b-icon>
      <h1>Enter Passcode</h1>
      <br>
      <p class="errorText">{{errorText}}</p>
      <p class="successMessage">{{successMessage}}</p>
      <div class="centerItems">
        <input  type="text" 
                v-for="i in characters" 
                :key="i.id" v-model="i.v" 
                :ref="'input'+i.id"
                maxlength="1"/>
                <!-- @change="nextInput(i.id)" -->
      </div>
      <b-button class="button" variant="success" size="lg" @click="submit()" :disabled="successMessage.length>1">Submit</b-button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'Passcode',
  props: {

  },
  data(){
    return{
      characters: [
        {id:1, v:""},
        {id:2, v:""},
        {id:3, v:""},
        {id:4, v:""},
        {id:5, v:""}],
      passphrase:"",
      errorText:"",
      successMessage:""
    }
  },

  mounted: function(){
    let passcode = this.$store.getters.getPasscode;
    if(passcode.length>1){
      this.characters = passcode;
      this.submit();
    }
  },

  methods:{
    openPage: function(e) {
      this.$router.push(e);
    },

    closePane: function() {
      this.$emit("closePasscode");
    },

    submit: function() {
      this.errorText = "";
      let codeSubmission = ""; //this.characters.join().replace(',','')
      this.$store.commit('storePasscode', this.characters);

      for(let i in this.characters){
        codeSubmission += this.characters[i].v;
      }

      if(codeSubmission == "11111"){
        this.successMessage = "Correct! Please Wait.."
        let that = this;
        setTimeout(function(){
          that.openPage('Complete')
        }, 3000);
        
      }else{
        this.errorText = "Incorrect Passcode"
      }
    },



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

.screen{
  width:60vw;
  height:50vh;
  margin-top: 10vh;
  background-image:linear-gradient(to bottom, rgb(65, 117, 160),rgb(26, 128, 146)); 
  border: solid;
  border-color: rgb(235, 251, 255);
  border-width:10px;
  border-radius: 10px;
  text-align: center;  
  padding: 10px;
}

input{
  width: 40px;
  height: 40px;
  border: solid;
  border-width: 3px;
  border-color:rgb(54, 54, 54);
  border-radius: 4px;
  background: white;
  margin: 10px;
  font-size: 30px;
  color: black;
  padding: 2px;
  text-align: center;
  text-transform:uppercase;
}

.button{
  margin:30px;
}

.closeButton{
  margin-left:-55vw;
  cursor: pointer;
}

.errorText{
  color:rgb(255, 43, 43);
  font-size: 20px;
  margin-top: -10px;
  letter-spacing: 2px;
}


</style>
