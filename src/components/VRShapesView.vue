<template>
  <a-scene class="vr">
    <a-box  v-for="i in boxes" 
            :key="'box'+i.id" 
            :name="'box'+i.id" 
            :position="i.position" 
            :rotation="i.rotation" 
            :color="i.color"></a-box>
    
    <!-- @click="openInfo(i.id)" -->
    
    <!-- <a-sphere v-for="i in spheres" 
            :key="'sphere'+i.id" 
            :name="'sphere'+i.id" 
            :position="i.position" 
            :radius="i.radius" 
            :color="i.color"></a-sphere>


    <a-cone v-for="i in cones" 
            :key="'cone'+i.id" 
            :name="'cone'+i.id" 
            :position="i.position" 
            :radius-bottom="i.radius" 
            radius-top="0" 
            :height="i.height" 
            :color="i.color"></a-cone> -->
    


    <!-- <a-dodecahedron color="yellow" position="-5 1.25 -5" radius="2"></a-dodecahedron>
    <a-icosahedron color="#FF926B" position="5 0.75 -3" radius="2"></a-icosahedron> -->
    <!-- <a-torus-knot position="1 0.75 3" color="#B84A39" arc="360" p="3" q="7" radius="2" radius-tubular="0.05"></a-torus-knot> -->
    <!-- <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane> -->
    <!-- <a-sky color="#ECECEC"></a-sky> -->
  </a-scene>

</template>

<script>
export default {
  name: 'VRShapesView',
  props: {
    
  },
  computed: {
   
  },
  data(){
    return{
      boxes:[
        {id:0, position:"-4 -3 5", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:1, position:"-5 1 -5", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:2, position:"4 5 -4", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:3, position:"5 0 9", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:4, position:"0 3 -4.5", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:5, position:"-2 -4 -5", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:6, position:"3 -8 -8", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:7, position:"7 -1 -9", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:8, position:"8 5 12", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:9, position:"12 -4 8", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:10, position:"-10 4 10", rotation:"0 45 0", color:this.randomColor(), animation:""},
      ],
      spheres:[
        {id:1, position:"0 1.25 -5", radius:"1.25", color:this.randomColor(), animation:""}
      ],
      cones:[
        {id:1, position:"1 0.75 -3", radius:"1", height:"2", color:this.randomColor(), animation:""}
      ],

      
    }
  },

  mounted: function(){
  },

  methods:{
    randomColor: function() {
                  //Purple,    Blue,     Green,   DarkBlue,  Yellow,   Orange,   Pink      LightBlue
      let colors = ['#A830C2','#479FDC','#4DBB73','#0F1C4D','#F3BF4C','#E48F33','#EC646D','#479FDC']
      let color = colors[Math.floor(Math.random() * colors.length)];
      return color;
    },

    openInfo: function(id){
      this.$emit("openInfo", id)
    }



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.vr{
}



</style>
