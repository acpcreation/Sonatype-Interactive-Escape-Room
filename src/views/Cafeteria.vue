<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h3>Cafeteria Cook</h3>
    <p>Customers will make orders and it is your job to select the correct products to fulfill the order.</p>

    <p class="successMessage">{{successMessage}}</p>

    <div class="sideBySide">
      <div class="plate">
        <div class="pillContainer">
          <span  class="pill" 
                v-for="i in selectedProducts" 
                :key="i"
                :style="'background-color:'+pillColors(i)">
            {{i}}
          </span>
        </div>
      </div>

      <div class="sideBySide">
        <b-icon class="icon" v-if="showCheck == true" icon="check-circle-fill" font-scale="2" variant="success"></b-icon>
        <b-icon class="icon" v-else-if="showCheck == false" icon="x-circle" font-scale="2" variant="danger"></b-icon>
        <div class="order">
          {{orders[currentOrder].order}}
        </div>
        <img class="accelerateOrder" src="../../public/img/accelerateOrder.png"/>
      </div>
     

    </div>

    <div class="servingContainer" :style="disableClickArea">
      <span class="pill" 
        v-for="i in productOptions" 
        :key="i"
        :style="'background-color:'+pillColors(i)"
        @click="addItem(i)">
        {{i}}
      </span>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Cafeteria',
  props: {
    
  },
  components: {

  },
  data(){
    return{
      orders:[
        {order: "I need LC", answers:["Lifecycle"]},
        {order: "I need Full Platform", answers:["Lifecycle", "Repository Manager", "Firewall"]},
        {order: "I need ALL", answers:["Lifecycle", "Repository Manager", "Firewall", "Container", "Lift", "IaC", "ADP", "ALP"]},
      ],

      currentOrder: 0,
      selectedProducts: [],
      productOptions: ["Lifecycle", "Repository Manager", "Firewall", "Container", "Lift", "IaC", "ADP", "ALP"],
      showCheck: null,
      successMessage: "",
      disableClickArea: ""
    }
  },

  mounted() {
    


  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    pillColors: function(e){
      let colors = {
        Lifecycle: '#479FDC', //Blue
        Firewall: '#8c30c2', //Purple
        RepositoryManager: '#4DBB73', //Green
        Container: '#EC646D', //Pink,
        Lift: '#f7d127',
        IaC: '#999999',
        ADP: '#0F1C4D',
        ALP: '#faa200'
      };
      let color = colors[e.replace(' ','')]
      return color;
    },

    addItem: function(e){
      if(!this.selectedProducts.includes(e)){
        this.selectedProducts.push(e);

        let itemsCorrect = this.selectedProducts.every(v => this.orders[this.currentOrder].answers.includes(v))
        let orderComplete = this.orders[this.currentOrder].answers.every(v => this.selectedProducts.includes(v))
        let that = this;

        if(orderComplete == true && itemsCorrect == true){
          this.showCheck = true;
          this.disabled = true;
          this.disableClickArea="pointer-events:none"
          setTimeout(function(){
            that.newRound(true);
          }, 3000);
        }
        else if(itemsCorrect == false){
          this.showCheck = false;
          this.disabled = true;
          this.disableClickArea="pointer-events:none"
          setTimeout(function(){
            that.newRound(false);
          }, 3000);
        }
      }
    },

    newRound: function(e){
      if(e == true){
        if(this.currentOrder < this.orders.length-1){
          this.selectedProducts = [];
          this.showCheck = null;
          this.disableClickArea = "";
          this.currentOrder +=1;
        }else{
          this.successMessage = "HINT"
        }

      }else{
        this.showCheck = null;
        this.selectedProducts = [];
        this.disableClickArea = "";
        let item = this.orders.splice(this.currentOrder,1)
        this.orders.push(item[0]);
      }
      
    },





  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding-top: 2vw;
}

.order{
  margin: 20px -10px 0px 20px;
  color: black;
  background: white;
  padding:10px;
  border-radius: 10px;
}

.sideBySide{
  display: flex;
  align-items: flex-start;
  margin:20px;
}

.sideBySide .icon{
  margin-top:25px;
}

.plate{
  margin:20px auto;
  width: 45vw;
  height: 45vw;
  background-color: rgb(247, 243, 226);
  border-radius: 50%;
  border: solid gray 2px;
}

.pillContainer{
  margin: 5vw auto;
  width: 34vw;
  height: 34vw;
  border-radius: 50%; 
  border: solid gray 2px;
  padding: 2vw;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}

.pill{
  border-radius:20px;
  margin: 5px;
  padding: 5px 15px;
  /* cursor: pointer; */
  color:white;
  text-align: center;
  font-size: 20px;
}

.servingContainer{
  margin: 40px 10vw 10px 10vw;
  background: gray;
  border-radius: 6px;
  height: 60px;
  padding-top: 15px;
}

.servingContainer .pill{
  cursor: pointer;
}

.accelerateOrder{
  width: 200px;
}








</style>
