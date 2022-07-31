<template>
  <div class="main">
    <b-modal id="PlayerModal" title="Enter Player Name" ok-title="Submit" ok-variant="success" @ok="submitUsername" ok-only> 
      <b-form-group
        id="input-group-1"
        label="Enter New Username:"
        label-for="input-1"
        description="Player name for recording and sharing high scores.">

        <b-form-input
          id="input-1"
          v-model="username"
          type="text"
          placeholder="Enter your own..."
          required
          style="text-transform: capitalize;"
        ></b-form-input>

      </b-form-group>
      <b-button type="submit" variant="warning" @click="randomUsername()"><b-icon icon="shuffle"></b-icon> Random</b-button>
    </b-modal>

  </div>
</template>

<script>
export default {
  name: 'Player',
  props: {
    
  },
  components: {

  },
  data(){
    return{
      username:"Player1",
    }
  },

  mounted() {
    this.$bvModal.show("PlayerModal")
    this.randomUsername();
  },

  methods: {
    submitUsername: function() {
      // e = bvModalEvent
      // Prevent modal from closing
      // bvModalEvent.preventDefault()

      console.log("New User: ", this.username)
      this.$store.commit('setPlayer', this.username); 
    },

    randomUsername: function(){
      let firstNames = [
        "happy",
        "sad",
        "crazy",
        "messy",
        "upside down",
        "radical",
        "superhuman",
        "techno",
        "chemical",
        "robot",
        "explosive",
        "extreme",
        "excited",
        "yuppie",
        "fluffy",
        "zero gravity",
        "laser vision",
        "chainsaw arm",
        "ninja",
        "ghostly",
        "brainiac",
        "geriatric", 
        "bionic"
      ];

      let lastNames = [
        "penguin",
        "elephant",
        "beaver",
        "hedgehog",
        "turtle",
        "chicken",
        "llama",
        "zombie",
        "chupacabra",
        "creeper",
        "batman",
        "skinwalker",
        "sasquatch",
        "gungan",
        "klingon",
        "nazgûl",
        "platypus",
        "sumo wrestler",
        "jared"
      ];

      this.username = firstNames[Math.floor(Math.random() * firstNames.length)] +" ";
      this.username += lastNames[Math.floor(Math.random() * lastNames.length)];

    }






  }
   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
  text-align: center;
 
}









</style>
