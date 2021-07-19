<template>
  <div class="main">
    <!-- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_image_magnifier_glass -->
    <div id="magnifier" :style="position"></div>
    <img id="backgroundMagnifyImage" src="../../public/img/antiqueStore.jpg" />
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

      let w = (window.screen.width - 1536)*2;

      // let h = window.screen.height/48;


      
      // console.log(w+", "+h)
      let bottomPadding = window.screen.height-(window.screen.height/8);
      // console.log(y+" < "+bottomPadding)

      if(x>-35 && y>-40 && y<bottomPadding){
        let bp = "-"+((x * zoom) +200 -w)+ "px -" +((y * zoom) +20)+"px";
        // let bp = "-" + ((x * zoom) - w + zoom) + "px; -" + ((y * zoom) - h + zoom) + "px";
        // let bp = "-"+((x * zoom) -600) + "px -" +((y * zoom) -300)+"px";
        this.position = "left:"+x+"px; top:"+y+"px; background-position:"+bp;
        // this.position = " -" + ((x * zoom) - w + zoom) + "px; -" + ((y * zoom) - h + zoom) + "px";
        // console.log(this.position)
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
  background-image: url('../../public/img/antiqueStore.jpg');
  background-repeat: no-repeat;
  /* background-size: 1500px*3; */
  background-size: 100vw *3;
}

#backgroundMagnifyImage{
  width: 1536px;
  /* width: 1400px; */
  /* height:100vh;  */
}








</style>
