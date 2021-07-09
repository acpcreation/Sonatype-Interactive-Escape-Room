<template>
  <a-scene class="vr">
    <a-camera>
      <a-cursor color="white"/>
    </a-camera>

    <!-- <a-entity 
    v-for="i in connections" 
            :key="'line'+i.id" 
          :line="i.connection"
          style="z-index:0px !important;"></a-entity> -->

    <a-box  v-for="i in boxes" 
            :key="'box'+i.id" 
            :name="'box'+i.id" 
            :position="i.position" 
            :rotation="i.rotation" 
            :color="i.color"
            @click="openInfo(i.id)"
            animation="property: rotation; to: 0 360 0; loop: true; dur: 4500; easing:linear;"></a-box>
    
    
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
  components: {

  },
  computed: {
   
  },
  data(){
    return{
      boxes:[
        {id:0, position:"-4 -3 5", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:1, position:"-10 -.5 1", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:2, position:"4 5 -4", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:3, position:"5 0 9", rotation:"0 45 0", color:this.randomColor(), animation:""},
        {id:4, position:"-5.5 3 -6", rotation:"0 45 0", color:this.randomColor(), animation:""},
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

      connections:[]

      
    }
  },

  mounted: function(){
    this.mapConnections()
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
    },

    mapConnections:function(){
      let conn;
      let array = this.boxes;
      for(let i=0;i<array.length;i++){
        let j=i; 
        if(i< array.length-1){
          j += 1;
        }else{
          j = 0;
        }

        conn = {
          id: i,
          connection:'start:'+array[i].position+'; end:'+ array[j].position+'; color: white'
        };
        this.connections.push(conn);

        conn = {
          id: i+100,
          connection:'start:'+array[i].position+'; end:'+ array[Math.floor(Math.random() * array.length)].position+'; color: white'
        };
        this.connections.push(conn);
      }


      // console.log(this.connections)
      
    }



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.vr{
}



</style>
