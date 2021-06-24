<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <!-- Mandarin, Hieroglyphics, Morse Code, Russian, Arabic  -->
    <h3>Decoder</h3>
    <p v-if="selectedBook == null">Discover the hidden meaning of the text</p>

    <div class="centerItems">
      <img class="codedPaper" src="../../public/img/codedPaper.jpeg" />

      <div class="library">
        <div v-for="i in library" :key="i.title" @click="openBook(i)" :style="'background-color:'+i.color">{{i.title}}</div>
      </div>
    </div>

    <b-form-input type="text" class="decodedMessage" :state="inputState" v-model="decodedMessage" placeholder="Enter the decoded message here.."></b-form-input>
    <p class="successMessage">{{successMessage}}</p>

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
      let msg = this.decodedMessage.toUpperCase();
      if(msg == 'PASSWORD'){
        this.successfulDecyption();
        return true;
      }else{
        return null;
      }
    }
  },
  data(){
    return{
      library:[
        {title: "Anchient Egyptian Hieroglyphs", color:"rgb(143, 106, 25)", content:"Bird: fly, Cat: crawl, Fish: swim"}, 
        {title: "The Languages of Eastern Asia", color:"rgb(139, 25, 25)", content:""}, 
        {title: "Common Use of Sand Script",     color:"rgb(46, 46, 105)", content:""}, 
        {title: "Beginners Guide to Morse Code", color:"rgb(31, 82, 33)", content:this.morseCodeContent()},
        {title: "American Sign Language", color:"rgb(133, 77, 107)", content:""},
        // {title: "Book", color:"rgb(133, 77, 107)", content:""}, 
      ],

      selectedBook: null,
      decodedMessage: "",
      successMessage: ""
    }
  },

  mounted() {
    


  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    openBook: function(e) {
      this.selectedBook = e;
    },

    successfulDecyption: function() {
      this.successMessage = 'Hooray!';
    },

    morseCodeContent: function(){
      let morse = "A = ._ ,"+
      "B = _... ,"+
      "C = _._. ,"+
      "D = _.. ,"+
      "E = . ,"+
      "F = .._. ,"+
      "G = __. ,"+
      "H = .... ,"+
      "I = .. ,"+
      "J = .___ ,"+
      "K = _._ ,"+
      "L = ._.. ,"+
      "M = __ ,"+
      "N = _. ,"+
      "O = ___ ,"+
      "P = .__. ,"+
      "Q = __._ ,"+
      "R = ._. ,"+
      "S = ... ,"+
      "T = _ ,"+
      "U = .._ ,"+
      "V = ..._ ,"+
      "W = .__ ,"+
      "X = _.._ ,"+
      "Y = _.__ ,"+
      "Z = __.."; 
      return morse;
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

.library{
  width: 400px !important;
  /* margin: 60px auto; */
  margin-top: 78px;
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
  width: 50vw;
  border-radius: 6px;
}

.decodedMessage{
  text-align: center;
  margin: 60px auto; 
  width:800px;
  text-transform:uppercase;
  color:rgb(133, 77, 107)
}





</style>
