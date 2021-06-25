<template>
  <div class="main" @click="close()">
    <div class="backCenter" :style="'background-color:'+content.color"><br></div>
    <b-icon class="bookMark" icon="bookmark-fill" font-scale="5"></b-icon>

    <div class="backMain" :style="'background-color:'+content.color"> 
      <div class="page">
        <div class="page">
          <div class="page">
            <h2>{{content.title}}</h2>
            <hr>
            <div class="scrollContainer">
              <p v-for="(i, index) in content.content" :key="i" >{{letters[index]}} = <b :style="content.style">{{i}}</b></p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: {
    content: Object
  },
  data(){
    return{
      letters:"A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z"
    }
  },

  mounted() {
    this.letters = this.letters.split(',');
    if(this.content.content.length >1){
      this.content.content = this.content.content.split(',');
    }else{
      this.content.content = this.letters;
    }
    

  },

  methods: {
    close: function() {
      this.$emit("close");
    },




  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  padding: 10vh 10vw;
  position:fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 100;
  font-family:'Times New Roman', Times, serif;
}

.backCenter{
  border-radius: 10px;
  width: 160px;
  height:82vh;
  margin: 6vh auto;
  border: solid 3px black;
}

.backMain{
  position:fixed;
  top:12vh;
  left:10vw;
  bottom:12vh;
  right:10vw;
  z-index: 101;
  border-radius: 10px;
  border: solid 3px black;
  padding: 8px;
  box-shadow: 0px 0px 6px black;
}

.page{
  border: solid 2px black;
  box-shadow: 0px 0px 8px black;
  width:100%;
  height: 100%;
  background-color:rgb(255, 243, 230);
  padding:8px;
}

h2{
  margin-top: 15px;
  margin-bottom:10px;
  color:black;
}

p{
  color:black;
  font-size:30px;
  font-weight: bold;
  letter-spacing: 3px;
  height: 60px;
}

b{
  font-weight: 100;
}

.bookMark{
  position:fixed;
  top:11vh;
  right:18vw;
  z-index: 102;
  color:rgb(197, 22, 22);
}






</style>
