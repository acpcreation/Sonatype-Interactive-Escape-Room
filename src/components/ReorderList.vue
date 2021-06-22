<template>
  <div class="footer centerItems">
    <p class="least">Least</p>

    <div  class="pill" 
      v-for="(i, index) in items" 
      :key="i"
      @click="selectItem(index)"
      >

      {{i}}
    </div>
    <!-- draggable="true" 
      ondragstart="drag(event)" 
      @ondragstart="selectItem(index)"-->

    <p class="most">Most</p>
    
  </div>
</template>

<script>
export default {
  name: 'ReorderList',
  props: {
    items: Array
  },
  
  data(){
    return{
      selectedItem:[]
    }
  },

  mounted: function(){
  },

  methods:{
    selectItem:function(i){
      this.selectedItem = this.items.splice(i, 1);
      this.items.splice(2, 0, this.selectedItem);
      console.log(this.selectedItem)
    },

    reorderItems:function(i){
      
      console.log(i)
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.footer{
  position: absolute;
  bottom:0;
  width:100vw;
  background-color:black;
  flex-wrap: nowrap;
  align-items: center;
  font-size: 14px;
}

.pill{
  background-color: white;
  border-radius:16px;
  margin:5px;
  padding: 2px 10px;
  cursor: pointer;
}

.least{
  margin:0px 10px;
  padding-right: 10px;
  border-right: solid 2px white;
}

.most{
  margin:0px 10px;
  padding-left: 10px;
  border-left: solid 2px white;
}



</style>
