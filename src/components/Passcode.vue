<template>
  <div class="main centerItems">
    <div class="screen">
      <b-icon class="closeButton" icon="x-circle-fill" font-scale="2" variant="dark" @click="closePane()"></b-icon>
      <h1>Enter Passcode</h1>
      
      <p class="" v-if="scrambledLetters.length>1">Unscramble the Passcode</p>
      <p class="scrambledLetters" v-if="scrambledLetters.length>1">{{scrambledLetters}}</p>
      <p class="errorText" v-else>Complete all the challenges to try and submit a passcode</p>
      <p class="errorText">{{errorText}}</p>
      <p class="successMessage">{{successMessage}}</p>
      <div class="centerItems">
        <input  type="text" 
                v-for="i in characters" 
                :key="i.id" v-model="i.v" 
                :ref="'input'+i.id"
                maxlength="1"
                v-on:keyup="changeInput($event)"
                :disabled="scrambledLetters.length<1"
                />
      </div>
      <b-button class="button" variant="success" size="lg" @click="submit()" :disabled="successMessage.length>1 || scrambledLetters.length<1">Submit</b-button>

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
        {id:0, v:""},
        {id:1, v:""},
        {id:2, v:""},
        {id:3, v:""},
        {id:4, v:""},
        {id:5, v:""},
        {id:6, v:""},
        {id:7, v:""},
        {id:8, v:""}],
      passphrase:"",
      scrambledLetters:"",
      correctPasscode:"DISCOVERY", 
      errorText:"",
      successMessage:""
    }
  },

  mounted: function(){
    let progress = this.$store.getters.getProgress;

    let complete = true;
    for(let i in progress){
      // console.log(progress[i])
      if(progress[i] != true && i != "Complete"){
        complete = false;
      }
    }
    if(complete == true){
      this.scrambledLetters = "Y D C R I V S O E" //DISCOVERY
    }


    if(progress.Complete){
      this.characters = [];
      for(let i in this.correctPasscode){
        this.characters.push({id:i, v:this.correctPasscode[i]})
      }
      this.submit();
    }else{
      let passcode = this.$store.getters.getPasscode;
      if(passcode.length>1){
        this.characters = passcode;
        this.submit();
      }
    }
    
   
  },

  methods:{
    openPage: function(e) {
      this.$router.push(e);
    },

    closePane: function() {
      this.$emit("closePasscode");
    },

    changeInput: function(evt){
      if(evt.key !== "Backspace"){
        try{
          evt.target.nextElementSibling.focus();
        }catch{
          //Do nothing
        }
      }else{
        try{
          evt.target.previousElementSibling.focus();
        }catch{
          //Do nothing
        }
      }
    },

    submit: function() {
      this.errorText = "";
      let codeSubmission = ""; //this.characters.join().replace(',','')
      this.$store.commit('storePasscode', this.characters);

      for(let i in this.characters){
        codeSubmission += this.characters[i].v.toUpperCase();
      }

      if(codeSubmission == this.correctPasscode){
        this.successMessage = "Correct! Please Wait.."

        this.$store.commit('updateProgress', {route:"Complete", context:this});

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
  min-height:50vh;
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
  color:rgb(255, 0, 0);
  font-size: 20px;
  font-weight: 500;
  margin-top: -10px;
  letter-spacing: 2px;
}

.scrambledLetters{
  font-size: 24px;
  color:black;
  letter-spacing: 5px;
  margin-bottom: 30px;
}


</style>
