<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <div class="fixItems">
      <h3>Clue Finder</h3>
      <p>Find all the hidden clues to decode the message.</p>
      <p class="successMessage">{{successMessage}}</p>
    </div>

    <b-progress 
        :value="oldClues.length" 
        :max="cluesLength"  
        class="progressBar"
        animated></b-progress>

    <!-- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_image_magnifier_glass -->
    <div id="magnifier" :style="position"></div>
    <img id="backgroundMagnifyImage" src="../../public/img/antiqueStore.jpeg" />
    <!-- @mouseover="hover = true" @mouseleave="hover = false" -->

    
    
    <div class="inputFooter" >
      <b-input-group class="inputGroup">
        <b-form-input type="text" v-model="clueInput" :state="inputCorrect" placeholder="Discovered Clue..."></b-form-input>
        <template #append>
          <b-button variant="success" @click="submitAnswer()">Submit</b-button>
        </template>
      </b-input-group>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ClueFinder',
  props: {
    
  },
  components: {

  },
  data(){
    return{
      // x:0,
      // y:0,
      position: "",
      // hover:false

      clueInput:"",
      clues:[
        "this is an answer",
        "another one",
        "here we go"
      ],
      oldClues: [],
      inputCorrect:null,
      cluesLength: 0,
      successMessage:""

    }
  },

  mounted() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "hint!";
    }

    
    this.cluesLength = this.clues.length;
    window.addEventListener('mousemove',this.mouseMoving);
    console.log("X: "+window.screen.width+" Y: "+window.screen.height)
  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    mouseMoving: function(e) {
      let halfWidth = 200/2;
      let zoom = 3;
      let x = e.pageX-halfWidth;
      let y = e.pageY-halfWidth;
      // let screenWidth = window.screen.width;
      //Large: 1920 => -180
      //Medium: 1536 => 220
      
      // console.log(x+", "+y)

      if(x>-35 && y>-40 && y< window.screen.height){
        let bp = "-"+((x * zoom) +220) + "px -" +((y * zoom) +20)+"px";
        this.position = "left:"+x+"px; top:"+y+"px; background-position:"+bp;
      }else{
        this.position = "visibility:hidden;"
      }
    },

    submitAnswer: function(){
      let clueFound = false;
      let clueIndex = 0;
      if(this.clueInput.length>2){
        for(let i in this.clues){
          if(this.clues[i].includes(this.clueInput)){
            clueFound = true;
            clueIndex = i;
            break;
          }
        }
      }

      if(clueFound == true){
        this.inputCorrect = true;
        let clue = this.clues.splice(clueIndex,1)
        this.oldClues.push(clue[0]);

        if(this.cluesLength == this.oldClues.length){
          this.successMessage = "HINT!"
          this.$store.commit('updateProgress', this.$route.name);
        }

      }else{
        this.inputCorrect = false;
      }

      let that = this;
      setTimeout(function(){
        that.clueInput = "";
        that.inputCorrect = null;
      }, 2200);

      
    }



  },

  destroyed: function() {
    window.removeEventListener('mousemove', this.mouseMoving);
  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding: 0px;
  margin-bottom: -100px;
}

.fixItems{
  position: absolute;
  top: 10px;
  right:10px;
  padding:5px 10px;
  background: rgba(0, 0, 0, 0.637);
  border-radius: 10px;
}

.fixItems p{
  margin-top:10px;
  margin-bottom:-10px;
}

.mousePosition{
  position: fixed;
  top: 15px;
  right:15px;
  background-color: white;
  border-radius: 6px;
  /* width:200px; */
  padding:5px 10px;
}

#magnifier{
  position: absolute;
  border: 3px solid #000;
  border-radius: 50%;
  cursor: none;
  width: 200px;
  height: 200px;
  background-image: url('../../public/img/antiqueStore.jpeg');
  background-repeat: no-repeat;
  /* background-size: 1500px*3; */
  background-size: 100vw *3;
}

#backgroundMagnifyImage{
  /* width: 1500px; */
  width: 100vw; 
}


.inputFooter{
  position: fixed;
  bottom: 0px;
  left: 20%;
  right: 20%;
  /* margin: 0px auto; */
  /* background: rgb(41, 41, 41); */
  border-radius: 10px;
  /* height: 60px; */
  padding: 10px 15px;
}

.progressBar{
  position: fixed;
  left: -230px;
  top:50vh;
  width: 60vh;
  transform: rotate(-90deg);
}





</style>
