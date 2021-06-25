<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <div class="fixItems">
      <h3>Clue Finder</h3>
      <p>Find all the hidden clues to decode the message.</p>
    </div>

    <!-- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_image_magnifier_glass -->
    <div id="magnifier" :style="position"></div>
    <img id="backgroundMagnifyImage" src="../../public/img/antiqueStore.jpeg" />
    <!-- @mouseover="hover = true" @mouseleave="hover = false" -->

  </div>
</template>

<script>

export default {
  name: 'ClueFinder',
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
    console.log(window.screen.width)
  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    mouseMoving: function(e) {
      let halfWidth = 200/2;
      let zoom = 3;
      let x = e.pageX-halfWidth;
      let y = e.pageY-halfWidth;
      // let screenWidth = window.screen.width;
      //Large: 1920 => -180
      //Medium: 1536 => 220
      
      // console.log(x+", "+y)
      if(x>-35 && y>-40){
        let bp = "-"+((x * zoom) +220) + "px -" +((y * zoom) +20)+"px";
        this.position = "left:"+x+"px; top:"+y+"px; background-position:"+bp;
      }else{
        this.position = "visibility:hidden;"
      }
    }



  },

  destroyed: function() {
    window.removeEventListener('mousemove', this.mouseMoving);
  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding: 0px;
  margin-bottom: -100px;
}

.fixItems{
  position: absolute;
  top: 10px;
  right:10px;
  padding:5px 10px;
  background: rgba(0, 0, 0, 0.637);
  border-radius: 10px;

}

.mousePosition{
  position: fixed;
  top: 15px;
  right:15px;
  background-color: white;
  border-radius: 6px;
  /* width:200px; */
  padding:5px 10px;
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
  background-size: 100vw *3
}

#backgroundMagnifyImage{
  /* width: 1500px; */
  width: 100vw; 
}








</style>
