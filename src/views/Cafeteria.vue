<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h3>Cafeteria Cook</h3>
    <p class="challengeDescription">Customers will make orders of Sonatype products for Open Source dependency management and it is your job to select the correct products to fulfill the order. Careful not to click a wrong item or they will leave and come back at the end of the day!</p>

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
        <img class="accelerateOrder" src="../../public/img/Robot-10.svg"/>
      </div>
    </div>

    <div class="servingContainer" :style="disableClickArea">
      <span class="pill" 
        v-for="i in productOptions" 
        :key="i.id"
        :style="'background-color:'+i.color"
        @click="addItem(i.id)"
        v-b-tooltip.hover :title="i.description">
        {{i.id}}
      </span>
    </div>
        
        
    <h1 class="h1Score" v-if="score >-1">{{('00000'+score).slice(-5)}}</h1>
    <h1 class="h1Score" v-else>{{score}}</h1>
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
        // {answers:["Lifecycle", "Firewall"], order: "As a developer, I want to make sure I’m only choosing the best possible components that meet company policy from the start. I’m tired of doing a bunch of rework because our security team waits until the end of the build to tell me that something’s wrong. "},
        // {answers:["Lifecycle", "Repository Manager"], order: "Our company needs a centralized storage spot that can be used for different types of artifacts as well as binaries being used in the build process. We’re also battling long feedback loops (sometimes months long) between dev + security, and are very concerned with licensing vulnerabilities. "},
        {answers:["Lifecycle", "Advanced Legal Pack", "Container"], order: "I’m looking for a way to run scans throughout our DevOps pipeline so we can identify vulnerabilities in both the staging and production environments. My legal team has also been putting pressure on me to find a way to perform license obligation and attribution reporting. Oh, and did I mention that we have container and Kubernetes deployments on multiple cloud platforms?"},
        // {answers:["Lifecycle","Firewall", "Lift"], order: "My team relies primarily on npm, we’re a big JavaScript shop. With all the recent attacks in the news, we want to make sure we’re being diligent about name space and typosquatting attacks. Code quality is top of mind for us! And we want a scanning tool that integrates with several different IDEs, with all the different dev teams we have. What would you recommend?"},
        // {answers:["Container", "Lift"], order: "I’m changing the architecture at our company to run all of our applications through docker and kubernetes. We’d also really like to get rid of SonarQube if possible because it’s noisy and expensive. Our developers only use source control and PR workflows as a way to write and review code as well, so we’d need a solution that plugs in well there."},
        {answers:["Lifecycle", "Repository Manager", "Firewall"], order: "Our security and DevOps teams are being asked from C-level leadership how we are protecting our applications and services from the increase of software supply chain attacks from upstream open source dependencies like name space/dependency confusion attacks. We need to identify a way to scale out protection before we bring in a vulnerable component AND continuously monitor for vulns in our deployed applications."},
        {answers:["Lifecycle", "Repository Manager", "Firewall","Container", "Lift"], order: "We have been Repo OSS users for many years and have been working through conversations to upgrade to Repo Pro for upcoming Repository Replication capabilities. Our enterprise teams are able to accurately control known risks for security and license compliance, but we are now in need to better understand how to protect against recent malicious malware injection attacks. We develop and manage multiple cloud-native applications in several different ecosystems and have been constantly trying to optimize our AppSec and security best practices for our hundreds of developers. Being able to fully automate security and quality for developer source code, infrastructure and containers, and open source governance policies is a challenge we are eager to accept. "},
        // {answers:[""], order: ""},
      ],

      currentOrder: 0,
      selectedProducts: [],
      productOptions: [
        {id:"Lifecycle", color:"#479FDC", description:"Monitors across the software supply chain automatically detecting and fixing open source dependency vulnerabilities."}, 
        {id:"Repository Manager", color:"#4DBB73", description:"Standardized artifact warehouse, used to cache, store, and server software modules and libraries."}, 
        {id:"Firewall", color:"#8c30c2", description:"Evaluates components entering your environment, blocking and quarantining any that are malicious or violate software security policy."}, 
        {id:"Container", color:"#EC646D", description:"Find and fix container vulnerabilities and compliance issues from build, to ship, to run."}, 
        {id:"Lift", color:"#faa200", description:"Deep code analysis tool focused on code quality and static analysis, with feedback optimized for developers."}, 
        // {id:"IaC", color:"#999999", description:"Description 6"}, 
        // {id:"ADP", color:"#0F1C4D", description:"Description 7"}, 
        {id:"Advanced Legal Pack", color:"#0F1C4D", description:"Streamline tool software license evaluation and obligation and attribution reporting."}  
      ],
      showCheck: null,
      successMessage: "",
      disableClickArea: "",
      score: 0,
      scoreInterval: null,
      roundScore:0
    }
  },

  mounted() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "Complete!";
      this.disableClickArea="pointer-events:none"
    }
    
    this.orders = this.shuffleArray(this.orders)
    this.newScoreRound(true)
  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    pillColors: function(e){
      let value = null;
      for(let i in this.productOptions){
        if(this.productOptions[i].id == e){
          value = this.productOptions[i].color;
          break;
        }
      }
      return value;
    },

    shuffleArray: function(eArray){
      var i, j, k;
      for (i = eArray.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        k = eArray[i];
        eArray[i] = eArray[j];
        eArray[j] = k;
      }
      return eArray;
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
          this.newScoreRound(true)
          setTimeout(function(){
            that.newRound(true);
          }, 3000);
        }
        else if(itemsCorrect == false){
          this.showCheck = false;
          this.disabled = true;
          this.disableClickArea="pointer-events:none"
          this.newScoreRound(false)
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
          clearInterval(this.scoreInterval)
          this.successMessage = "Complete!"
          this.$store.commit('updateProgress', {route:this.$route.name, context:this, score:1000});
        }

      }else{
        this.showCheck = null;
        this.selectedProducts = [];
        this.disableClickArea = "";
        let item = this.orders.splice(this.currentOrder,1)
        this.orders.push(item[0]);
      }
    },

    newScoreRound: function(e){
      if(this.scoreInterval != null){
        // Correct / Incorrect
        if(e == true){
          this.score += 1000-this.roundScore;
        }else{
          this.score -= this.roundScore;
        }
        this.roundScore=0;
        clearInterval(this.scoreInterval)
      }

      let that = this;
      this.scoreInterval = setInterval(function(){
        that.roundScore+=10;
      }, 1000);      
    }





  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding-top: 2vw;
  background-image: linear-gradient(to bottom, rgba(22, 22, 22, 0.88),rgba(0, 0, 0, 0.88)), 
                    url('../../public/img/background.svg');
  min-height: 100vh !important;
  background-size: cover !important;
}

.order{
  margin: 0px 10px 0px 20px;
  max-width: 22vw;
  color: black;
  background: white;
  padding:10px;
  border-radius: 10px;
}

.sideBySide{
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  /* justify-content: center; */
  margin-top:40px;
}

.sideBySide .icon{
  margin-top:25px;
  font-size: 50px !important;
}

.plate{
  margin:20px 8vw;
  width: 32vw;
  height: 32vw;
  background-color: rgb(247, 243, 226);
  border-radius: 50%;
  border: solid gray 2px;
}

.pillContainer{
  margin: 3.8vw auto;
  width: 24vw;
  height: 24vw;
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
  position: fixed;
  bottom: 20px;
  left: 20%;
  /* margin: 0px auto; */
  background: rgb(48, 48, 48);
  border-radius: 6px;
  height: 60px;
  padding-top: 15px;
  padding-left: 15px;
  padding-right:15px;
}

.servingContainer .pill{
  cursor: pointer;
}

.accelerateOrder{
  width: 300px;
  /* margin-right: 5vw; */
  margin-top: 5vh;
}








</style>
