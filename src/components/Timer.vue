<template>
  <div>
    <div :class="'main ' +largeTimerStyle">
      {{this.t.min}}:{{this.t.sec}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    start: Boolean
  },
  components: {

  },
  data(){
    return{
      interval: null,
      t:{
        min:0,
        sec:0
      },
      largeTimerStyle:"large"
    }
  },

  mounted() {
  
  },

  watch: { 
    start: function(){ 
      if(this.start == true){
        this.startTimer()
      }else{
        this.stopTimer();
      }
    }
  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    startTimer: function(){
      let time = localStorage.getItem("time");

      let startTime = null;
      this.date = new Date();

      if(time != null){
        // console.log(JSON.parse(time))
        startTime = JSON.parse(time)
      }else{
        startTime = this.date.getTime()
        localStorage.setItem("time", this.date.getTime());
      }
      let that = this;
      this.interval = setInterval(function() {
        that.date = new Date();
        let distance = that.date.getTime() - startTime;
        
        that.t.min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        that.t.sec = Math.floor((distance % (1000 * 60)) / 1000);
        // console.log(that.t.min+" : "+that.t.sec)
      }, 1000);
   
      setTimeout(function(){
        that.largeTimerStyle = "";
      }, 3000);
    },


    stopTimer: function(){
      this.largeTimerStyle = "complete";
      clearInterval(this.interval)
    }




  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  /* z-index:110; */
  position: fixed;
  background: rgb(20, 20, 20);
  color: rgb(78, 78, 78);
  padding: 5px 10px 3px 10px;
  border-radius: 8px;

  left: 10px;
  bottom: 10px;
  transform: scale(1);

  transition-timing-function: ease;
  transition: transform 1.5s, left 1.5s, bottom 1.5s;
}

.large{
  left:50%;
  bottom:50%;
  transform: scale(4);
}

.complete{
  transform: scale(3);
  left:80px;
  bottom:50px;
  color:rgb(64, 221, 64);
}










</style>
