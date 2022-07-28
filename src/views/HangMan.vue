<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Hang-Man</h1>
    <p class="challengeDescription">Hangman! In this challenge you need complete each round by guessing letters on the keyboard in order to reveal the hidden answer. <a>Complete each round</a>. All your clues will be displayed at the end.</p>
    <br>

    <p class="questionDisplay">{{roundQuestions[roundIndex]}}</p>

    <div class="centerItems">
      <table>
        <tr v-for="(row, index) in tableContents" :key="'row'+index">
          <td v-for="(j, jdex) in row" :key="'row'+index+''+jdex"  :class="displayClass(j)">
            <span v-if="guessedLetters.includes(j)">
              {{j}}
            </span>
          </td>
        </tr>
      </table>
    </div>

    <p>Characters Guessed</p>
    <p class="guessedLetters">{{guessedLetters.toString().replaceAll(',',', ')}}</p>

      <p class="successMessage" v-for="i in successMessage" :key="i">{{i}}</p>

    <b-button variant="outline-warning" @click="newRound()" v-if="successMessage.length >0 && roundIndex < rounds.length-1">New Round</b-button>
  </div>
</template>

<script>
export default {
  name: 'HangMan',
  props: {
    
  },
  components: {

  },


  data(){
    return{
      tableContents:[],

      rounds:[
        [["?","","","","","","","","","","","","","?"],
        ["","","P","R","I","M","A","R","I","L","Y","","",""],
        ["","W","H","I","T","E","S","O","U","R","C","E","",""],
        ["?","","","","","","","","","","","","","?"]],

        [["?","","","","","","","","","","","","","?"],
        ["","J","F","R","O","G","","S","N","Y","K","","",""],
        ["","W","H","I","T","E","S","O","U","R","C","E","",""],
        ["?","","","","","","","","","","","","","?"]],
        
        [["?","","","","","","","","","","","","","?"],
        ["","S","N","Y","K","","A","N","D","","","","",""],
        ["","","","","J","F","R","O","G","","","","",""],
        ["?","","","","","","","","","","","","","?"]],
        
        [["?","","","","S","N","Y","K","","","","","","?"],
        ["","","","P","A","R","T","N","E","R","S","","",""],
        ["","","W","I","T","H","","R","A","P","I","D","",""],
        ["?","","","","","","","","","","","","","?"]],
        
        [["?","","","","","","","","","","","","","?"],
        ["","","C","H","E","C","K","M","A","R","X","","",""],
        ["","","B","L","A","C","K","","D","U","C","K","",""],
        ["?","","","","","","","","","","","","","?"]],

        [["?","","","","S","N","Y","K","","","","","","?"],
        ["","","","C","A","N","","S","C","A","N","","",""],
        ["","","","T","E","R","R","A","F","O","R","M","",""],
        ["?","","","","","","","","","","","","","?"]]
      ],

      roundQuestions:[
        "Preferred for shops using C/C++; recently acquired Diffend, is popular in mid-market.",
        "Most often lose to this competitor on price; if a customer has a limited budget, they are likely evaluating this company as well.",
        "Prospects can access their SaaS platform for free, and run an evaluation without ever speaking to a company representative.",
        "Acquired DeepCode and partners with Rapid7 for a combined SAST/SCA/DAST and RASP solution. ",
        "Leads with security first, typically lower ACV deals; can provide visibility into application status across SAST, IAST and SCA.",
        "The only one of our main competitors who offer IaC as a separate SKU; scans Terraform modules and Kubernetes YAML, JSON, and Helm charts.",
      ],

      hints:[
        "We’ve been trying to figure out how to add automation to our SDLC process, as of right now it is manual and extremely time intensive. Legal review is even worse.", 
        "At one point we tried jFrog due to them including XRay for free, however, we ended up paying a LOT more than originally quoted...there were a lot of hidden costs due to our request for HA and multiple servers.", 
        "We have also looked at Black Duck and Whitesource for their security solutions. ", 
        "We have no way to know if we are vulnerable or not, and no easy way to understand if we are using licenses that do not comply with company policy.", 
        "We saw on the website there is a premium bundle, but given we don’t know what we have for code or the quality of it, given the nature of us looking at cloud and new technologies like container, we would be interested in understanding more.", 
        "We appreciate you getting us this info today. We would love a demo/ presentation on the platform so we can compare and contrast with the other vendors we’re evaluating."
      ],

      guessedLetters:[],
      uniqueCharacters:[],
      roundIndex: 0,
      successMessage:""
    }
  },

  mounted() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = this.hints;
      this.roundIndex = this.hints.length-1;
    }

    this.tableContents = this.rounds[this.roundIndex];

    this.addCharacterListeners();
    this.getUniqueLetters();

    // console.log(this.uniqueCharacters)
  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },


    displayClass: function(e){
      if(e.length>0 && e!="?"){
        return "characterPresent";
      }
      else if(e == "?"){
        return "makeEmpty";
      }
      else{
        return "";
      }
    },


    addCharacterListeners: function(){
      window.addEventListener('keydown', (e) => {
        let key = e.key.toUpperCase();
        key = key.toString().replace(/\W/ig, "");

        //Check if it's a letter?
        if(!this.guessedLetters.includes(key) && key.length==1){
          this.guessedLetters.push(key)
          this.checkIfComplete();
        }
      });
    },

    checkIfComplete: function(){
      let complete = true;
      for(let i in this.uniqueCharacters){
        if(!this.guessedLetters.includes(this.uniqueCharacters[i])){
          complete = false;
          break;
        }
      }

      if(complete == true){
        this.successMessage = [this.hints[this.roundIndex]];

        if(this.roundIndex == this.hints.length-1){
          this.$store.commit('updateProgress', {route:this.$route.name, context:this, score:1000});
          this.successMessage = this.hints;
        }

      }
    },

    getUniqueLetters: function(){
      for(let i in this.tableContents){
        for(let j in this.tableContents[i]){
          let letter = this.tableContents[i][j];
          if(letter != "" && letter != "?" && !this.uniqueCharacters.includes(letter)){
            this.uniqueCharacters.push(letter)
          }
        }
      }
    },

    newRound: function(){
      this.roundIndex++;
      this.guessedLetters = []
      this.uniqueCharacters = [];
      this.successMessage = "";
      this.tableContents = this.rounds[this.roundIndex];
      this.getUniqueLetters();
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

.questionDisplay{
  margin:30px auto;
  font-weight: bold;
  width: 50vw;
  padding: 5px 40px;
  border-top: solid 2px white;
  border-bottom: solid 2px white;
  background-image: linear-gradient(to left, transparent,rgb(80, 6, 179), rgb(80, 6, 179), rgb(80, 6, 179), rgb(80, 6, 179), transparent); 

}

table{
  border: solid 6px rgb(0, 110, 255);
  margin-bottom: 40px;
  /* border-radius: 10px; */
}

td{
  text-align: center;
  color: black;
  font-size: 28px;
  text-align: center;
  padding:5px;
  width: 50px;
  background: rgb(23, 216, 142);
  font-size: 40px;
  font-weight: bold;
  border: solid 4px rgb(39, 39, 39);
  height: 75px;
  text-transform:uppercase;
}

.characterPresent{
  background: white;
}

.guessedLetters{
  color: #66bfff;
  font-size: 40px;
}

.makeEmpty{
  background: none !important;
}

a{
  color: rgb(0, 174, 255) !important;
}










</style>
