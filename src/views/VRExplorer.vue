<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h3>VR Explorer</h3>
    <p>Take a look around! In this challenge you need to find..</p>
    <VRShapesView />
  </div>
</template>

<script>
import VRShapesView from '@/components/VRShapesView.vue'

export default {
  name: 'VRExplorer',
  props: {
    
  },
  components: {
    VRShapesView,
    
  },

  computed: {
    
  },
  data(){
    return{
      shapes:["Cube","Sphere","Cone","Dodecahedron","Icosahedron","Torus"]
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
  padding:20px;
}

.returnToHomeButton{
  z-index:100;
}







</style>
