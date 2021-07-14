<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h3>Cafeteria Cook</h3>
    <p class="challengeDescription">Customers will make orders and it is your job to select the correct products to fulfill the order. Careful not to click a wrong item!</p>

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
        {answers:["Lifecycle", "Firewall"], order: "As a developer, I want to make sure I’m only choosing the best possible components that meet company policy from the start. I’m tired of doing a bunch of rework because our security team waits until the end of the build to tell me that something’s wrong. "},
        {answers:["Lifecycle", "Repository Manager", "ALP"], order: "Our company needs a centralized storage spot that can be used for different types of artifacts as well as binaries being used in the build process. We’re also battling long feedback loops (sometimes months long) between dev + security, and are very concerned with licensing vulnerabilities. "},
        {answers:["Lifecycle", "ALP", "Container"], order: "I’m looking for a way to run scans throughout our DevOps pipeline so we can identify vulnerabilities in both the staging and production environments. My legal team has also been putting pressure on me to find a way to perform license obligation and attribution reporting. Oh, and did I mention that we have container and Kubernetes deployments on multiple cloud platforms?"},
        {answers:["Lifecycle","Firewall", "Lift"], order: "My team relies primarily on npm, we’re a big JavaScript shop. With all the recent attacks in the news, we want to make sure we’re being diligent about name space and typosquatting attacks. Code quality is top of mind for us! And we want a scanning tool that integrates with several different IDEs, with all the different dev teams we have. What would you recommend?"},
        {answers:["Container", "Lift"], order: "I’m changing the architecture at our company to run all of our applications through docker and kubernetes. We’d also really like to get rid of SonarQube if possible because it’s noisy and expensive. Our developers only use source control and PR workflows as a way to write and review code as well, so we’d need a solution that plugs in well there."},
        {answers:["Lifecycle","IaC", "ADP", "ALP"], order: "We need to know what’s in our open source packages, and we’re getting a lot of pressure from our legal department to make sure all of our licenses are in compliance. We also have a new SRE team focused on expanding our usage of the cloud. As we shift our culture we want to give our developers all of the information they need to make decisions and take ownership of security."},
        {answers:["Lifecycle", "Repository Manager", "Firewall"], order: "Our security and DevOps teams are being asked from C-level leadership how we are protecting our applications and services from the increase of software supply chain attacks from upstream open source dependencies like name space/dependency confusion attacks. We need to identify a way to scale out protection before we bring in a vulnerable component AND continuously monitor for vulns in our deployed applications."},
        {answers:["Lifecycle", "Repository Manager", "Firewall","Container", "Lift"], order: "We have been Repo OSS users for many years and have been working through conversations to upgrade to Repo Pro for upcoming Repository Replication capabilities. Our enterprise teams are able to accurately control known risks for security and license compliance, but we are now in need to better understand how to protect against recent malicious malware injection attacks. We develop and manage multiple cloud-native applications in several different ecosystems and have been constantly trying to optimize our AppSec and security best practices for our hundreds of developers. Being able to fully automate security and quality for developer source code, infrastructure and containers, and open source governance policies is a challenge we are eager to accept. "},
        {answers:["Lifecycle", "Repository Manager", "Firewall", "Container", "Lift", "IaC", "ADP", "ALP"], order: "I'm Bill Gates and I just wanna spend! Literally give me everything you have."},
        // {answers:[""], order: ""},
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
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "hint!";
    }
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
          this.$store.commit('updateProgress', this.$route.name);
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
  height: 100vh;
  margin-bottom:-200px;
  background-image: linear-gradient(to bottom, rgba(22, 22, 22, 0.92),rgba(0, 0, 0, 0.92)), 
                    url('../../public/img/background.png');
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
}

.plate{
  margin:20px auto;
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
  background: gray;
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
  width: 200px;
  margin-right: 5vw;
  margin-top: 30px;
}








</style>
