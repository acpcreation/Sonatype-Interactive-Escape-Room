<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h1>Hang-Man</h1>
    <p>In this challenge you need to...</p>

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
      tableContents:[
        ["?","","","","","","","","","","","","","?"],
        ["","","H","I","D","D","E","N","","","","","",""],
        ["","","","","M","E","S","S","A","G","E","","",""],
        ["?","","","","","","","","","","","","","?"]
      ],

      guessedLetters:[],
      uniqueCharacters:[]
    }
  },

  mounted() {
    this.addCharacterListeners()

    for(let i in this.tableContents){
      for(let j in this.tableContents[i]){
        let letter = this.tableContents[i][j];
        if(letter != "" && letter != "?" && !this.uniqueCharacters.includes(letter)){
          this.uniqueCharacters.push(letter)
        }
      }
    }

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
        }
      });
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

table{
  border: solid 6px rgb(0, 110, 255);
  margin-bottom: 40px;
  /* border-radius: 10px; */
}

tr{

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
