<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <h3>VR Explorer</h3>
    <p style="margin:auto 15vw;">Take a look around! In this challenge you need to visit every node in order to collect information around securing containers to reveal the escape clue. Hint: move the focus dot onto the nodes you want to visit.</p>
    <p class="successMessage">{{successMessage}}</p>

    <b-progress 
        :value="visited.length" 
        :max="content.length"  
        class="progressBar"
        animated></b-progress>

    <VRShapesView @openInfo="openInfo($event)"/>
                                                                                                                <!-- @ok="resetPath()" -->
    <b-modal id="vrDetailsModal" :title="currentContent.title+' - 00'+currentContent.id" class="modal" ok-title="Explore Onward" ok-variant="warning"  ok-only> 
      <!-- <p v-if="visited.includes(currentContent.id) == true" class="visited">Visited {{visited}}</p> -->
      <div v-if="currentContent.description">
        <p>{{currentContent.description}}</p>
        <ul v-if="currentContent.list != undefined">
          <li v-for="i in currentContent.list" :key="i">{{i}}</li>
        </ul>
        <p>{{currentContent.footer}}</p>
      </div>
     
    </b-modal>
  </div>
</template>

<script>
import VRShapesView from '@/components/VRShapesView.vue'

export default {
  name: 'VRExplorer',
  props: {
    
  },
  components: {
    VRShapesView,
    
  },

  computed: {
    
  },
  data(){
    return{
      successMessage:"",
      visited: [],

      content:[
        {title:"Slack",      description:"Join the conversation on Slack ( https://sonatype.slack.com/archives/C01N520DV3R ) to ask questions and learn more."},
        {title:"Research",   description:"According to Gartner, By 2022, more than 75% of global organizations will be running containerized applications in production, which is a significant increase from fewer than 30% today.", footer:"In the next 12 months, 36% of security pros who are implementing/expanding container security plan to implement it during testing, 37% plan to implement it in development, and 20% plan to implement it during design (July 2020)."},
        {title:"Conatainer", description:"Containers are a way to package code and all its dependencies and can be deployed to any environment in a matter of seconds (for example, moving quickly from a testing environment to production). Using a container allows teams to move fast, deploy software efficiently, and operate at an unprecedented scale. "},
        {title:"NeuVector",  description:"NeuVector provides commercial-grade, full lifecycle container security. This includes", list:["Vulnerability scanning", "Security assessments", "Compliance", "Admission control (gate containers based on certain criteria like root access)"], footer: "Similar to Sonatype, NeuVector provides a best-of-breed solution with unique features that differentiate it from the competition."},
        {title:"Layers",     description:"A container is made up of different \"layers\":", list:["Infrastructure/Server", "Host Operating System (runtime engine)", "Applications and their dependencies"], footer:"As containers heavily use service based architectures, deep, runtime network protection is critical to overall security. "},
        {title:"Priorities", description:"Businesses that deploy containerized applications need...", list:["To ensure they can maintain a high level of security", "To provide speed and agility for DevOps teams", "To meet compliance requirements"]},
        {title:"Pitch",      description:"Container elevator pitch: Nexus Container scans container images from build to production for vulnerabilities and compliance issues/misconfigurations, using admission controls and policy to manage container risk. What sets us apart from competitors is our run-time behavioral inspection that identifies any and all network traffic at Layer 7 and every container process to: ", list:["Automatically create behavior-based security policies", "Enforce Data Loss Protection", "Prevent zero-day malware and network attacks", "Tunnels", "Breaches", "and more!"]},
        {title:"Differentiatiors", description:"Nexus Container is the ONLY full lifecycle container security platform that performs all of these key funtions: ", list:["Scans images and platform for vulnerabilities and compliance misconfigurations from dev to production", "Autmatically inspects and learn all network traffic at Layer 7 and all processes on every container", "Automatically generates security policies to create a zero-trust environment where ANY anomalous behavior can be identified, alerted on, or blocked"]},
        {title:"Cloud Platforms",  description:"Runs on all major cloud platforms including", list:["AWS", "Azure", "Google Cloud Platform"], footer:"Supporting all cloud-native frameworks."},
        {title:"Integration",description:"Nexus Lifecycle will integrate with Nexus Container to allow image and registry scans of containers and their components with vulnerabilities. ", footer:"This will surface in Nexus Lifecycle alongside application scan results, allowing users to see everything in a single harmonized view. As expected with Nexus Lifecycle, the robust policy engine can be leveraged, and waivers may be applied, allowing full vulnerability management in the same familiar view."},
        {title:"Sidecar",    description:"Sidecar (or service proxies) are assigned to a container being managed in a cluster and are responsible for communication with other service instances. They can support capabilities such as:", list:["Service (instance) discovery", "Load balancing", "Authentication and authorization", "Secure communications", "and others."]},
        // {title:"", description:"", list:[""], footer:""},

      ],
      currentContent: {}

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
    
    openInfo: function(e) {
      if(!this.visited.includes(e)){
        this.visited.push(e)
      }
      this.currentContent = this.content[e];
      this.currentContent.id = e;

      this.$bvModal.show("vrDetailsModal"); 

      if(this.visited.length == this.content.length){
        this.challengeComplete()
      }
    },

    

    challengeComplete: function(){
      this.successMessage = "hint!";
      this.$store.commit('updateProgress', this.$route.name);
    }
   




  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding:20px;
}

.returnToHomeButton{
  z-index:100;
}

.progressBar{
  z-index:100;
  position: fixed;
  left: -230px;
  top:50vh;
  width: 60vh;
  transform: rotate(-90deg);
}

.modal p{
  color: black;
}

/* .visited{
  color: rgb(92, 92, 92);
  font-size: 10px;
  font-weight: bold;
} */







</style>
