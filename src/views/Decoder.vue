<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <!-- Mandarin, Hieroglyphics, Morse Code, Russian, Arabic  -->
    <h3>Decoder</h3>
    <p v-if="selectedBook == null" class="challengeDescription">Decipher the hidden text using the books in the below library. Enter the full text in the input field at the bottom of the page to reveal the escape clue. "The data we collect on OSS are security is.."</p>

    <p class="successMessage">{{successMessage}}</p>


    <div class="centerItems">
      <!-- <img class="codedPaper" src="../../public/img/codedPaper.jpeg" /> -->
      <div class="codedPaper">
        <span v-for="i in encodedMessage" :key="i.id" :style="i.style">{{i.char}}</span>
      </div>

      <div class="library">
        <div v-for="i in library" :key="i.title" @click="openBook(i)" :style="'background-color:'+i.color">{{i.title}}</div>
      </div>
    </div>
    
    <br><br><br><br>
    <b-form-input type="text" class="decodedMessage" :state="inputState" v-model="decodedMessage" placeholder="Enter the decoded message here.."></b-form-input>
    <b-progress 
        :value="decodedMessage.length" 
        :max="message.length"  
        class="progressBar"
        :variant="progressStyle"
        animated></b-progress>

    <Book v-if="selectedBook != null" :content="selectedBook" @close="selectedBook = null"/>

  </div>
</template>

<script>
import Book from '@/components/Book.vue'


export default {
  name: 'Decoder',
  props: {
    
  },
  components: {
    Book
  },
  computed: {
    inputState() {
      let msgIn = this.decodedMessage.toUpperCase();
      msgIn = msgIn.replaceAll(",","")
      msgIn = msgIn.replaceAll(" ","")

      let msgOriginal = this.message.replaceAll(",","")
      msgOriginal = msgOriginal.replaceAll(" ","")

      if(msgIn.length>2 && msgOriginal.includes(msgIn)){
        if(msgIn == msgOriginal){
          this.successfulDecyption();
        }
        this.updateProgressStyle("primary")
        return true;
      }else if(msgIn.length <3){
        return null;
      }
      else{
        this.updateProgressStyle("danger")
        return false;
      }
      
    }
  },
  data(){
    return{
      library:[
        {title: "Anchient Egyptian Hieroglyphs", color:"rgb(143, 106,25)", style:"font-family:hieroglyphics;font-size:50px;", content:""}, 
        {title: "The Languages of Eastern Asia", color:"rgb(139, 25, 25)", style:"font-family:mandarin;", content:this.mandarinContent()}, //https://fonts.google.com/specimen/Long+Cang?subset=chinese-simplified
        {title: "Common Tongue of Russian",      color:"rgb(46, 46, 105)", style:"font-family:russian;", content:""}, 
        {title: "Beginners Guide to Morse Code", color:"rgb(31, 82,  33)", style:"font-size:60px;font-weight:bold;", content:this.morseCodeContent()},
        {title: "American Sign Language",        color:"rgb(133, 77,107)", style:"font-family:sign-language;font-size:100px;", content:""}, //https://www.lifeprint.com/asl101/pages-layout/gallaudettruetypefont.htm
        // {title: "Book", color:"rgb(133, 77, 107)", content:""}, 
      ],
      
      encodedMessage:[],
      selectedBook: null,
      decodedMessage: "",
      successMessage: "",
      message: "",
      progressStyle: "primary"
    }
  },

  mounted() {
    this.message = "license, popularity, age, security, hygiene rating";
    this.message = this.message.toUpperCase()

    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.decodedMessage = this.message ;
      this.successfulDecyption();
    }

    this.encodeMessage(this.message)

  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    openBook: function(e) {
      this.selectedBook = e;
    },

    successfulDecyption: function() {
      window.scroll({
          top: 0, 
          left: 0, 
          behavior: 'smooth'
        });
      this.successMessage = 'Clue: We have 250 users (dev and sec) here at EZ but Acme has 1000 developers and 250 security professionals. We know we have allocated $200,000 for this initiative, but pending the solution we may have to bring in our new parent company to help streamline integrations, procedures, etc.';
      this.$store.commit('updateProgress', {route:this.$route.name, context:this, score:1000});
    },

    morseCodeContent: function(){
      let morse = [
        "._",   //A
        "_...", //B
        "_._.", //C
        "_..",  //D
        ".",    //E
        ".._. ",//F
        "__.",  //G
        " ....",//H
        "..",   //I
        ".___", //J
        "_._",  //K
        "._..", //L
        "__",   //M
        "_.",   //N
        "___",  //O
        ".__.", //P
        "__._", //Q
        "._.",  //R
        "...",  //S
        "_",    //T
        ".._",  //U
        "..._", //V
        ".__",  //W
        "_.._", //X
        "_.__", //Y
        "__.."  //Z
      ]; 
      return morse;
    },

    mandarinContent: function(){
      let mandarin = [
          "三", //A
          "四", //B
          "五", //C
          "六", //D
          "七", //E
          "八", //F
          "九", //G
          "百", //H
          "千", //I
          "万", //J
          "上", //K
          "中", //L
          "左", //M
          "右", //N
          "大", //O
          "小", //P
          "春", //Q
          "夏", //R
          "秋", //S
          "冬", //T
          "东", //U
          "忠", //V
          "孝", //W
          "兄", //X
          "贝", //Y
          "先"] //Z
      return mandarin;
    },

    updateProgressStyle: function(e){
      this.progressStyle = e;
    },

    encodeMessage: function(evt){
      this.encodedMessage = [];
      let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let alphabet = "";
      // letters = letters.split(',');

      let langs = [
        "hieroglyphics",
        "mandarin",
        "russian",
        "morse",
        "sign",
        ];

      for(let i=0;i<evt.length;i++){
        let character = evt.charAt(i)

        if(character == " " || character == "," ){
          this.encodedMessage.push({id:i, char:character , style:""})
        }else{
          let selected = langs[Math.floor(Math.random() * langs.length)];
          let style = "";

          switch(selected) {
            case "hieroglyphics":
              style = "font-family:hieroglyphics; font-size:50px;"
              break;
            case "mandarin":
              alphabet = this.mandarinContent();
              character = alphabet[letters.indexOf(character)];
              style = "font-family:mandarin; font-size:34px;"
              break;
            case "russian":
              style = "font-family:russian; font-size:34px;"
              break;
            case "morse":
              alphabet = this.morseCodeContent();
              character = alphabet[letters.indexOf(character)];
              style = "font-size:45px; letter-spacing:1px;"
              break;
            case "sign":
              style = "font-family:sign-language; font-size:80px;"
              break;
          }

          this.encodedMessage.push({id:i, char:character, style:style})
        }
      }
      // console.log(this.encodedMessage)
    }






  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding: 2vh;
}

.library{
  width: 400px !important;
  /* margin: 60px auto; */
  margin: 100px -90px 0px -30px;
  padding: 8px;
  border: solid 6px rgb(51, 27, 21);
  border-radius: 5px;
  transform: rotate(90deg);
}

.library div{
  /* height: 1000px; */
  border: solid 2px black;
  border-radius: 4px;
  color:silver;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  /* box-shadow: 5px 10px #888888; */
  padding: 5px 10px;
  background-color:rgb(46, 46, 105);
  font-size: 20px;
}

/* .library div :hover{
  transform: scale(1.5);
  transition:scale 2s;
} */


.codedPaper{
  width: 76vw;
  border-radius: 6px;
  /* height:50vh; */
  background-image: url('../../public/img/codedPaper.jpeg');
  background-size: 76vw;
  padding: 25px;
  text-align: left;
  font-size:20px;
}

.codedPaper span{
  margin:0px 5px;
  /* margin-top:-10px !important; */
  user-select: none;
  /* background: lightblue; */
}

.decodedMessage{
  text-align: center;
  margin: 30px auto; 
  width:80vw;
  text-transform:uppercase;
  color:black;
}

.progressBar{
  margin: -20px auto;
  width: 80vw;
}





</style>
