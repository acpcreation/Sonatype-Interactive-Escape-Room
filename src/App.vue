<template>
  <div id="app">
    <router-view/>

    <Welcome v-if="welcome" @closeWelcome="welcome=!welcome"/>
    <Audit v-if="audit" @closeAudit="audit=!audit"/>
  </div>
</template>

<script>
import Welcome from '@/components/Welcome.vue'
import Audit from '@/components/Audit.vue'

export default {
  name: 'App',
  components: {
    Welcome,
    Audit
  },
  data(){
    return{
      welcome:true,
      audit: false
    }
  },
  created() {
    window.addEventListener('keydown', (e) => {
      if (e.key == '|') {
        this.audit = true;
      }
    });
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;

  background-image:
    linear-gradient(to bottom, rgba(22, 22, 22, 0.85),rgba(0, 0, 0, 0.85)); 

  /* border-top: 5px solid rgb(20, 20, 20); */
  padding-bottom:100px;
}

a{
  cursor: pointer;
}

h1,h2,h3{
  all: none;
  font-weight: 100;
  letter-spacing: 1px;
  color: white;
  margin: 30px;
}

h1{
  font-size: 60px;
}

h2{
  font-size: 26;
}

p{
  color:white;
}

hr{
  width:80%;
}

.logo{
  width: 20vw;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

.centerItems{
  width:100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.returnToHomeButton{
  position: fixed;
  left: 20px;
  top: 20px;
  cursor: pointer;
}

.scrollContainer{
  overflow:scroll;
  height:85%;
  width:100%;
}

.successMessage{
  color: rgb(77, 248, 77) !important;
  margin:20px !important;
}




</style>
