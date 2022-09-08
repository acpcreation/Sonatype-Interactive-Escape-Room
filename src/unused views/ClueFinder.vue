<template>
  <div class="main">
    <b-icon class="returnToHomeButton" icon="arrow-left-circle-fill" font-scale="2" variant="light" @click="openPage('')"></b-icon>
    <div class="fixItems">
      <h3>Clue Finder</h3>
      <p>Find all the hidden clues and submit them in order to unlock the clue. Scroll down to view the submission box.</p>
      <p class="successMessage">{{successMessage}}</p>
    </div>

    <b-progress 
        :value="oldClues.length" 
        :max="cluesLength"  
        class="progressBar"
        animated></b-progress>

    <MagnifyView />
    
    <div class="inputFooter" >
      <b-input-group class="inputGroup">
        <b-form-input type="text" v-model="clueInput" :state="inputCorrect" placeholder="Discovered Clue..."></b-form-input>
        <template #append>
          <b-button variant="success" @click="submitAnswer()">Submit</b-button>
        </template>
      </b-input-group>
      
      <div class="foundItems">
        <div  class="pill" 
          v-for="i in oldClues" 
          :key="i.clue"
          @click="selectItem(i)">
          {{i.clue}}
        </div>
      </div>
    </div>


    <b-modal id="clueDetailsModal" :title="selectedClue.clue" class="modal" ok-title="Close" ok-variant="warning"  ok-only>       
      <div>
        {{selectedClue.details}}
      </div>
    </b-modal>

  </div>
</template>

<script>
import MagnifyView from '@/components/MagnifyView.vue'

export default {
  name: 'ClueFinder',
  props: {
    
  },
  components: {
    MagnifyView
  },
  data(){
    return{
      clueInput:"",
      clues:[
        {clue:"Multitool", details:"Lift uses multiple tools - There is generally no single tool that will find all of the types or errors that you care about."},
        {clue:"Integration", details:"Integration matters - Lift integrates into your processes and workflows and scans GitHub, GitLab, and BitBucket repositories (Azure DevOps on the roadmap for end of 2021)."},
        {clue:"Trust", details:"Cherish developer trust - It’s all about developers. If developers aren’t getting value from your tools, or you’re wasting their time, they won’t care, will stop responding, and will ignore or remove the tools."},
        {clue:"Productivity", details:"Tools can support productivity - most developers are worried that too many tools or too many checks in CI will only slow down their processes. While this can be true, it doesn’t have to be the case."},
        {clue:"Experience", details:"Developer Experience is Paramount: While security, QA and other stakeholders can create/implement tools, only developers can actually fix bugs. Tools need to be integrated into their workflow and results delivered in a way that makes it easy for them to spot, review, and fix them. (Facebook and Google key findings)"},
        {clue:"Broad&Open", details:"Broad Analysis & Open Platform: Scanning security, performance, reliability, and code style, no single tool can catch every bug, and the most effective approach involves an extensive range of tools to broadly cover languages and bug categories. (Facebook and Google key findings)"},
        {clue:"FixRates", details:"Measure Fix Rates to Improve Results: When tools produce extensive results riddled with false positives, developer trust is lost and tools get ignored, and when multiple tools are run, the false positive risk rises exponentially. By measuring which bugs developers fix and which ones they ignore, they could identify and remediate noisy tools, to ensure that when bugs surfaced, they’d get fixed. (Facebook and Google key findings)"},
        {clue:"Outdated", details:"Outdated code analysis tools generate too many false positives that take time to weed out, leading to issues being ignored, bugs being missed, and the tools themselves being abandoned. With Lift bugs are 70 times more likely to be fixed than those reported via the issue tracker."},
        {clue:"OtherTools", details:"Most other tools don’t fit within developers workflows, but Lift integrates with GitHub, GitLab, and BitBucket on-prem. Lift integrates with GitHub cloud, and GitLab and BitBucket as a SaaS solution. "},
        {clue:"SonarQube", details:"Traditional code quality tools (like SonarQube) only do lightweight analysis (linting), and can’t catch the tougher security issues. While linters catch performance and reliability bugs, they only inspect each file in isolation, so they can’t identify bugs that span across the project. Lift provides better results (catches bugs that SonarQube does not), better coverage (more security-relevant issues), and lower noise (fewer false positives)"},
        // {clue:"", details:""},
      ],
      selectedClue:{clue:"", details:""},
      oldClues: [],
      inputCorrect:null,
      cluesLength: 0,
      successMessage:""

    }
  },

  mounted() {
    //Check save state
    let progress = this.$store.getters.getProgress;
    if(progress[this.$route.name] == true){
      this.successMessage = "Clue: We’d like a way to be notified when issues do arise, and those notifications be sent to the correct business units for remediation / action. Oh and by the way...we don’t want to automatically fail everything, all the time. Some vulnerabilities are worse than others.";
      this.oldClues = this.clues;
    }
    this.cluesLength = this.clues.length;
    this.addCharacterListeners();
  },

  methods: {
    openPage: function(e) {
      this.$router.push("/"+e);
    },

    submitAnswer: function(){
      let clueFound = false;
      let clueIndex = 0;
      if(this.clueInput.length>2){
        for(let i in this.clues){
          let clueItem = this.clues[i].clue.toUpperCase()
          let cInput = this.clueInput.toUpperCase()
          cInput = cInput.replaceAll(" ", "")
          if(clueItem.includes(cInput)){
            clueFound = true;
            clueIndex = i;
            break;
          }
        }
      }

      if(clueFound == true){
        this.inputCorrect = true;
        let clue = this.clues.splice(clueIndex,1)
        this.oldClues.push(clue[0]);
        this.selectItem(clue[0])

        if(this.cluesLength == this.oldClues.length){
           window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth'
          });
          this.successMessage = "Clue: We’d like a way to be notified when issues do arise, and those notifications be sent to the correct business units for remediation / action. Oh and by the way...we don’t want to automatically fail everything, all the time. Some vulnerabilities are worse than others. "
          this.$store.commit('updateProgress', {route:this.$route.name, context:this, score:1000});
        }

        let that = this;
        setTimeout(function(){
          that.clueInput = "";
          that.inputCorrect = null;
        }, 2200);

      }else{
        this.inputCorrect = false;
      }

    },

    selectItem: function(e){
      this.selectedClue = e;
      this.$bvModal.show("clueDetailsModal"); 
      
    },

    addCharacterListeners: function(){
      window.addEventListener('keydown', (e) => {
        if(e.key == 'Enter'){
          this.submitAnswer()
        }
      });
    },



  },

  
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
  padding: 0px;
  margin-bottom: -100px;
  overflow:scroll;
}

.fixItems{
  position: absolute;
  top: 10px;
  right:10px;
  padding:5px 10px;
  background: rgba(0, 0, 0, 0.637);
  border-radius: 10px;
  max-width: 30vw;
}

.fixItems p{
  margin-top:10px;
  margin-bottom:-10px;
}

.inputFooter{
  /* position: fixed;
  bottom: 0px;
  left:10px;
  right: 10px; */
  /* margin: 0px auto; */
  /* background: rgb(41, 41, 41); */
  /* z-index: 101; */
  margin-top:100px;
  border-radius: 10px;
  padding: 10px 15px;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
}

.inputGroup{
  width: 350px;
}

.progressBar{
  position: fixed;
  left: -240px;
  top:50vh;
  width: 60vh;
  transform: rotate(-90deg);
}

.foundItems{
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  font-size: 14px;
  margin: auto 25px;
}

.pill{
  background-color: #0F1C4D;
  color: white;
  border-radius:15px;
  margin:5px;
  padding: 3px 13px;
  cursor: pointer;
}





</style>
