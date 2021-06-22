<template>
  <div class="main">
    <img class="logo" src="../../public/img/sonatype_logo.png"/>

    <div class="centerItems">  
      <!-- https://www.vecteezy.com/vector-art/420220-modern-office-setup-background-vector-flat-illustration -->
      <img class="backgroundImage" src="../../public/img/background.png"/>
    </div>

    <Passcode v-if="passcode" @closePasscode="passcode=!passcode"/>
    
    <div class="buttonImages">
      <img class="passcodePage"   @click="passcode=!passcode" src="../../public/img/passcode.png"/>
      <img class="mazePage"       @click="openPage('RememberThePath')" src="../../public/img/maze.png"/>
      <img class="calculatorPage" @click="openPage('Calculator')" src="../../public/img/calculator.png"/>
      <img class="clueFinderPage" @click="openPage('ClueFinder')" src="../../public/img/map.jpeg"/>
      <img class="vrExplorerPage" @click="openPage('VRExplorer')" src="../../public/img/vrheadset.png"/>
      <img class="decoderPage"    @click="openPage('Decoder')" src="../../public/img/book.png"/>
      <img class="priceQuotePage" @click="openPage('PriceQuotes')" src="../../public/img/abacus.jpg"/>

    </div>

    
  </div>
</template>

<script>

import Passcode from '@/components/Passcode.vue'

export default {
  name: 'Home',
  components: {
    Passcode,
  },
  data(){
    return{
      welcome:true,
      passcode:false,
    }
  },
  methods:{
    openPage: function(e) {
      // console.log(e)
      this.$router.push('/'+e);
    }
  }
}
</script>

<style scoped>
.main{
  padding-top: 10px;
}

.backgroundImage{
  width: 90%;
}


.buttonImages img{
    position: fixed;
    cursor: pointer;
}

.passcodePage{
  top:50vh;
  left: 50vw;
  width: 160px;
}

.mazePage{
  top:20vh;
  left: 20vw;
  width: 100px;
}

.calculatorPage{
  top:40vh;
  left: 66vw;
  width: 60px;
}

.clueFinderPage{
  top:72vh;
  left: 14vw;
  width: 150px;
}

.vrExplorerPage{
  top:20vh;
  left: 80vw;
  width: 70px;
}

.decoderPage{
  top:71vh;
  left: 80vw;
  width: 70px;
}

.priceQuotePage{
  top: 30vh;
  left: 40vw;
  width: 100px;
}


</style>
