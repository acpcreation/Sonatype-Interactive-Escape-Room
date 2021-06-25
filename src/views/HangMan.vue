<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Hang-Man</h1>
    <p>In this challenge you need to guess letters on the keyboard in order to reveal the hidden phrase. </p>

    <p class="questionDisplay">Round {{roundIndex+1}}</p>

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

    <p class="successMessage">{{successMessage}}</p>
    <b-button variant="outline-warning" @click="newRound()" v-if="successMessage.length >1 && roundIndex < rounds.length-1">New Round</b-button>
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
        ["","","H","I","D","D","E","N","","","","","",""],
        ["","","","M","E","S","S","A","G","E","","","",""],
        ["?","","","","","","","","","","","","","?"]],

        [["?","","","","","","","","","","","","","?"],
        ["","","N","E","X","T","","R","O","U","N","D","",""],
        ["","","","T","O","","W","I","N","","I","T","",""],
        ["?","","","","","","","","","","","","","?"]],
      ],

      guessedLetters:[],
      uniqueCharacters:[],
      roundIndex: 0,
      hints:["Hint 1", "Hint 2"],
      successMessage:""
    }
  },

  mounted() {
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
        this.successMessage = this.hints[this.roundIndex];
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











</style>
