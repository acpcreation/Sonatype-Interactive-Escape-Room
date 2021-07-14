<template>
  <div class="main">
    <!-- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_image_magnifier_glass -->
    <div id="magnifier" :style="position"></div>
    <img id="backgroundMagnifyImage" src="../../public/img/antiqueStore.jpeg" />
    <!-- @mouseover="hover = true" @mouseleave="hover = false" -->
  </div>
</template>

<script>
export default {
  name: 'MagnifyView',
  props: {
    
  },
  components: {

  },
  data(){
    return{
      // x:0,
      // y:0,
      position: "",
      // hover:false
    }
  },

  mounted() {
    window.addEventListener('mousemove',this.mouseMoving);
    console.log("X: "+window.screen.width+" Y: "+window.screen.height)
  },

  methods: {
    mouseMoving: function(e) {
      // console.log(e)
      let halfWidth = 200/2;
      let zoom = 3;
      let x = e.pageX-halfWidth;
      let y = e.pageY-halfWidth;
      // let screenWidth = window.screen.width;
      //Large: 1920 => -180
      //Medium: 1536 => 220
      
      // console.log(x+", "+y)
      let bottomPadding = window.screen.height - (window.screen.height/4)-20
      // console.log(y+" < "+bottomPadding)

      if(x>-35 && y>-40 && y< bottomPadding){
        let bp = "-"+((x * zoom) +220) + "px -" +((y * zoom) +20)+"px";
        this.position = "left:"+x+"px; top:"+y+"px; background-position:"+bp;
      }else{
        this.position = "visibility:hidden;"
      }
    },




  },

  destroyed: function() {
    window.removeEventListener('mousemove', this.mouseMoving);
  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{

}


#magnifier{
  position: absolute;
  border: 3px solid #000;
  border-radius: 50%;
  cursor: none;
  width: 200px;
  height: 200px;
  background-image: url('../../public/img/antiqueStore.jpeg');
  background-repeat: no-repeat;
  /* background-size: 1500px*3; */
  background-size: 100vw *3;
}

#backgroundMagnifyImage{
  /* width: 1500px; */
  width: 100vw;
  height:100vh; 
}








</style>
