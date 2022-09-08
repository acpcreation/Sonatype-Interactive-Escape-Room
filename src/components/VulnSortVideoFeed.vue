<template>
  <div>
   <video id="videoFeed" autoplay></video>    
  </div>
</template>

<script>
export default {
  name: 'VulnSortVideoFeed',
  props: {
    
  },
  components: {

  },
  data(){
    return{
      
    }
  },

  mounted() {
    // this.startVideoFeed();


  },

  methods: {
    startVideoFeed: async function(){
      var video = document.getElementById('videoFeed');

      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        await navigator.mediaDevices.getUserMedia({video:true}).then((stream) => {
          video.srcObject = stream;
          video.play();
        }) //sound:true
      }
      // https://www.youtube.com/watch?v=nhX9EUGIZ6o

      
      const resp = await axios.post('https://httpbin.org/post', { hello: 'world' })
      console.log(resp.data.json)
      // setInterval(function(){
      //   axios.post()
      // }, 100);
    },




  },

  beforeRouteLeave (to, from, next) {
    //Turn off camera
    var video = document.getElementById('videoFeed');
    const mediaStream = video.srcObject;
    const tracks = mediaStream.getTracks();
    tracks.forEach(track => track.stop())
    next();
  },

   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#videoFeed{
  position: fixed;
  left:10px;
  bottom: 10px;
  width: 15vw;
}









</style>
