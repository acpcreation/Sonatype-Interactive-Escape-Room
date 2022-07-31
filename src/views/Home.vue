<template>
  <div class="main">
    <img class="logo" src="../../public/img/sonatype_logo.png"/>
    <b-icon class="settingsButton" icon="gear-fill" font-scale="2" variant="dark" @click="settings = !settings"></b-icon>
    <Settings v-if="settings" @closeSettings="settings = !settings"/>

      <!-- https://www.vecteezy.com/vector-art/420220-modern-office-setup-background-vector-flat-illustration -->
      <!-- <img class="backgroundImage" src="../../public/img/background.png"/> -->
    
      <div class="buttonImages" @click="settings = false">
        <img class="mazePage"       @click="openPage('RememberThePath')" src="../../public/img/Maze.svg"/>
        <img class="calculatorPage" @click="openPage('Calculator')" src="../../public/img/Calculator.svg"/>
        <img class="vulnerabilitySort" @click="openPage('VulnerabilitySort')" src="../../public/img/Vuln.svg"/>
        <img class="decoderPage"    @click="openPage('Decoder')" src="../../public/img/Decoder.svg"/>
        <img class="priceQuotePage" @click="openPage('PriceEstimator')" src="../../public/img/Price.svg"/>
        <img class="cafeteriaPage" @click="openPage('Cafeteria')" src="../../public/img/Pizza.svg"/>

        <img class="passcodePage"   @click="passcode=!passcode" src="../../public/img/Arrows.svg"/>
        <!-- <img class="clueFinderPage" @click="openPage('ClueFinder')" src="../../public/img/map.jpeg"/> -->
        <!-- <img class="vrExplorerPage" @click="openPage('VRExplorer')" src="../../public/img/vrheadset.png"/> -->
        <!-- <img class="hangManPage"    @click="openPage('HangMan')" src="../../public/img/hangman.png"/> -->
        <!-- <img class="familyFeudPage" @click="openPage('FamilyFeud')" src="../../public/img/familyfeud.png"/> -->
      </div>

    <Passcode v-if="passcode" @closePasscode="passcode = !passcode"/>
    <!-- <Background /> -->
  </div>
</template>

<script>

import Passcode from '@/components/Passcode.vue'
import Settings from '@/components/Settings.vue'
// import Background from '@/components/Background.vue'

export default {
  name: 'Home',
  components: {
    Passcode,
    Settings,
    // Background
  },
  data(){
    return{
      welcome:true,
      passcode:false,
      settings: false,
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

.settingsButton{
  position: absolute;
  top:11px;
  right: 11px;
  cursor: pointer;
}


.buttonImages{
  height:800px;
  width: 1500px ;
  margin-bottom:-200px;
  background-image:url('../../public/img/background.svg'); 
  background-repeat: no-repeat;
  background-size: 1500px;
  margin:5px auto;
}

.buttonImages img{
    position: relative;
    cursor: pointer;
}

.passcodePage{
  top:518px;
  left: -54px;
  width: 292px;
}

.mazePage{
  top:520px;
  left: 940px;
  width: 120px;
}

.calculatorPage{
  top:520px;
  left: 965px;
  width: 110px;
  /* transform: rotate(-70deg); */
}

.clueFinderPage{
  top:90px;
  left: 70px;
  width: 150px;
  transform: rotate(-5deg);
}

.vulnerabilitySort{
  top:518px;
  left: 211px;
  width: 121px;
}

.decoderPage{
  top:518px;
  left: -44px;
  width: 120px;
  /* transform: rotate(8deg); */
  /* opacity: .9; */
}

.priceQuotePage{
  top: 394px;
  left: -64px;
  width: 66px;
  /* transform: rotate(18deg); */
  /* opacity: .95; */
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
  top: 704px;
  left: 294px;
  width: 120px;
}


@media (max-width: 1300px) {
  .main{
    transform: scale(0.9);
    margin-left: -4vw;
  }
}

@media (max-width: 1300px) {
  .main{
    transform: scale(0.8);
    margin-left: -10vw;
  }
}

@media (max-width: 1200px) {
  .main{
    transform: scale(0.7);
    margin-left: -14vw;
  }
}



</style>
