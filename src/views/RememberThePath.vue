<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>

    <h1>Follow The Path</h1>
    <p>In this challenge you need to guess the path from the start to the end in order to unlock the Passcode Digit.</p>

    <div class="tableView">
      <p class="start">Start</p>
      <table id="pathTable" v-if="tableLoad">
        <tr v-for="(i, indexi) in path" :key="indexi">
          <td v-for="(j, indexj) in i" :key="indexj" @click="checkPath(indexi, indexj)">
            <b-icon v-if="path[indexi][indexj] == 'done'" icon="check-circle-fill" font-scale="2" variant="success"></b-icon>
            <b-icon v-else icon="x-circle" font-scale="2" variant="dark"></b-icon>

          </td>
        </tr>
      </table>
      <p class="finish">Finish</p>
    </div>

    <br><br><br><br>
    <p class="successMessage">{{passcodeHint}}</p>
    <br>

  </div>
</template>

<script>
export default {
  name: 'RememberThePath',
  props: {
    
  },
  components: {

  },
  data(){
    return{
      path:[
        ["done",0,0,0,0,0,0,0],
        [0,1,0,5,0,0,0,0],
        [2,3,4,0,6,7,0,0],
        [0,0,0,0,0,8,9,0],
        [0,0,0,13,12,11,10,0],
        [0,0,15,14,0,0,0,0],
        [0,16,0,18,0,20,21,0],
        [0,0,17,0,19,0,22,23],
      ],
      nextStep: 1,
      tableLoad: true,
      passcodeHint:"",

      
    }
  },

  mounted() {

  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    checkPath: function(i,j) {
      let step = this.path[i][j];
      if(this.nextStep == step || step == "done"){
        this.path[i][j] = "done";
        this.nextStep++;

        this.tableLoad = false;
        this.tableLoad = true;
        if(this.path[7][7] == "done"){
          this.passcodeHint = "HINT";
          alert("hint")
        }

      }else{
        this.nextStep = 1;
        this.path = [
          ["done",0,0,0,0,0,0,0],
          [0,1,0,5,0,0,0,0],
          [2,3,4,0,6,7,0,0],
          [0,0,0,0,0,8,9,0],
          [0,0,0,13,12,11,10,0],
          [0,0,15,14,0,0,0,0],
          [0,16,0,18,0,20,21,0],
          [0,0,17,0,19,0,22,23],
        ];
        this.tableLoad = false;
        this.tableLoad = true;
      }
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

table{
  background-color: white;
  margin:0;
}

td, th{
  border: 1px solid rgb(44, 44, 44);
}

td{
  width: 50px;
  height:50px;
  cursor: pointer;
}

.start{
  text-align: left;
  margin-bottom: 0px;
  margin-left: 4px;
}

.finish{
  text-align: right;
  margin-right: 4px;
}

.tableView{
  width: 400px;
  margin-top: 2vw;
  margin-left:auto;
  margin-right: auto;
}


@media (min-width: 800px) {
  .tableView{
    margin-top: 150px;
    transform: scale(1.5);
  }
}






</style>
