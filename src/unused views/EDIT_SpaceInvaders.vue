<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <!-- 
      It would be so awesome to put space invaders on a screen at a conference.
      Hacker invaders? ;)  I bet there are open sourced ones available
      Then after every level pause and put up info about a clever vulnerability, like something from blogs
      Or a differential on how our solutions function
      So can have bunch of people watching and you get to do a quick 30 second pitch after a level is cleared
     -->
  </div>
</template>

<script>
export default {
  name: 'SpaceInvaders',
  props: {
    
  },
  components: {

  },
  data(){
    return{
      
    }
  },

  mounted() {
    


  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
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









</style>
