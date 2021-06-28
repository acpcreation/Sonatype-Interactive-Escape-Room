<template>
  <div class="main">
    <img class="logo" src="../../public/img/sonatype_logo.png"/>

      <!-- https://www.vecteezy.com/vector-art/420220-modern-office-setup-background-vector-flat-illustration -->
      <!-- <img class="backgroundImage" src="../../public/img/background.png"/> -->
    
      <div class="buttonImages">
        <img class="passcodePage"   @click="passcode=!passcode" src="../../public/img/passcode.png"/>
        <img class="mazePage"       @click="openPage('RememberThePath')" src="../../public/img/maze.png"/>
        <img class="calculatorPage" @click="openPage('Calculator')" src="../../public/img/calculator.png"/>
        <img class="clueFinderPage" @click="openPage('ClueFinder')" src="../../public/img/map.jpeg"/>
        <img class="vrExplorerPage" @click="openPage('VRExplorer')" src="../../public/img/vrheadset.png"/>
        <img class="decoderPage"    @click="openPage('Decoder')" src="../../public/img/book.png"/>
        <img class="priceQuotePage" @click="openPage('PriceQuotes')" src="../../public/img/abacus.jpg"/>
        <img class="hangManPage"    @click="openPage('HangMan')" src="../../public/img/hangman.png"/>
        <img class="familyFeudPage" @click="openPage('FamilyFeud')" src="../../public/img/familyfeud.png"/>
        <img class="cafeteriaPage" @click="openPage('Cafeteria')" src="../../public/img/cafeteria.png"/>


      </div>

    <Passcode v-if="passcode" @closePasscode="passcode=!passcode"/>
    
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
  /* overflow-x:scroll; */
}

/* .backgroundImage{
  width: 90%;
} */


.buttonImages{
  height:800px;
  width: 1500px ;
  margin-bottom:-200px;
  background-image:url('../../public/img/background.png'); 
  background-repeat: no-repeat;
  background-size: 1500px;
  margin:5px auto;
}

.buttonImages img{
    position: relative;
    cursor: pointer;
}

.passcodePage{
  top:435px;
  left: 445px;
  width: 200px;
}

.mazePage{
  top:394px;
  left: -98px;
  width: 85px;
}

.calculatorPage{
  top:510px;
  left: 900px;
  width: 60px;
  transform: rotate(-70deg);
}

.clueFinderPage{
  top:90px;
  left: 70px;
  width: 150px;
  transform: rotate(-5deg);
}

.vrExplorerPage{
  top:320px;
  left: 538px;
  width: 70px;
}

.decoderPage{
  top:490px;
  left: 190px;
  width: 70px;
  transform: rotate(8deg);
  opacity: .9;
}

.priceQuotePage{
  top: 180px;
  left: 110px;
  width: 100px;
  transform: rotate(18deg);
  opacity: .95;
}

.hangManPage{
  top: 30px;
  left: 440px;
  width: 150px;
}

.familyFeudPage{
  top: 60px;
  left: -760px;
  width: 150px;
  border-radius: 8px;
  opacity: .9;
}

.cafeteriaPage{
  top: 620px;
  left: -900px;
  width: 250px;
}


@media (max-width: 1200px) {
  .main{
    transform: scale(0.8);
  }
}


</style>
