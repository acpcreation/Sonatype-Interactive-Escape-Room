<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <img class="logo" src="../../public/img/sonatype_logo.png"/>

    <div class="centerItems">
      <div class="scoreCollumn" v-for="i in games" :key="i">
        <h3>{{i}}</h3>
        <table>
          <!-- gamePlayerList(i) -->
          <tr v-for="j in gamePlayerList(i)" :key="j.time">
            <td class="player" >{{j.id}}</td>
            <td class="score">{{j.score}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="highScores">
      <p><b>High Scores</b></p>
      <table>
        <tr v-for="j in highScores" :key="j.time">
          <td class="player" >{{j.id}}</td>
          <td class="score">{{j.score}}</td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: {},
  components: {},

  computed:{

    highScores(){
      var returnPlayers = [];
      for(let i in this.players){
        let found = false
          for(let j in returnPlayers){
            if(this.players[i].id == returnPlayers[j].id){
              returnPlayers[j].score+=this.players[i].score;
              found = true;
            }
          }

          if(found == false){
            returnPlayers.push(this.players[i])
          }
      }
        
      returnPlayers.sort(function(a,b){
        return b.score - a.score;
      });

      returnPlayers = returnPlayers.slice(0, 5)
      return returnPlayers;
    }

  },

  data(){
    return{
      games: [
        "Escape the Maze"
      ],
      players:[
        {id:"Player1", score:10280, time:"1/2/3", game:"Escape the Maze"}
      ]
    }
  },

  mounted() {

    // window.addEventListener("message", function(message){
    //   // console.log(message.data)
    //   if(message.origin == "http://localhost:8082/"){
    //     alert(message.data)
    //   }
    // });
   
    this.addNewScore({id:"Player2", score:102280, time:"1/2/4", game:"VR Adventure"})
    this.addNewScore({id:"Player3", score:10000, time:"1/2/5", game:"Hangman"})
    this.addNewScore({id:"Player3", score:99, time:"1/2/6", game:"Escape the Maze"})
    this.addNewScore({id:"Player4", score:8973, time:"1/3/1", game:"Hangman"})
    this.addNewScore({id:"Player5", score:98732, time:"1/3/2", game:"Hangman"})
    this.addNewScore({id:"Player6", score:10, time:"1/3/3", game:"Escape the Maze"})


  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },
    
    addNewScore: function(e){
      if(!this.games.includes(e.game)){ 
        this.games.push(e.game)
      }

      var newUser = true;
      for(var i in this.players){
        if(i.id == e.id && i.game == e.game){
          i = e;
          newUser = false;
        }
      }
      if(newUser == true){
        this.players.push(e);
      }
      this.sortScores();
    },

    sortScores: function(){
      this.players.sort(function(a,b){
          return b.score - a.score;
        }
      );
    },

    gamePlayerList(e){
      var returnPlayers = [];
      for(let i in this.players){
        if(this.players[i].game == e){
          returnPlayers.push(this.players[i])
        }
      }
      return returnPlayers;
    },




  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding: 2vw;
}

.centerItems{
 margin-top:20px;
 align-items: stretch;
}

.scoreCollumn{
  background: white;
  color:black;
  border-radius: 10px;
  box-shadow: 0px 6px 6px black;
  padding:20px 0px;
  /* width:vw; */
  margin:10px;
}

h3,p{
  color: black;
}

table{
  margin: 0px auto;
}

.player{
  text-align: left;
  padding-right: 20px;
}

.score{
  text-align: right;
}

.highScores{
  background: white;
  color:black;
  border-radius: 10px;
  box-shadow: 0px 6px 6px black;
  padding:10px 15px;
  position: fixed;
  top:10px;
  right: 10px;
}

.highScores p{
  margin-bottom:2px;
  font-size: 16px;
}











</style>
