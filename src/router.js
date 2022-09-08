import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RememberThePath from './views/RememberThePath.vue'
import Calculator from './views/Calculator.vue'
// import ClueFinder from './views/ClueFinder.vue'
// import VRExplorer from './views/VRExplorer.vue'
import Decoder from './views/Decoder.vue'
// import PriceQuotes from './views/PriceQuotes.vue'
import PriceEstimator from './views/PriceEstimator.vue'
// import FamilyFeud from './views/FamilyFeud.vue'
// import HangMan from './views/HangMan.vue'
import Cafeteria from './views/Cafeteria.vue'
import VulnerabilitySort from './views/VulnerabilitySort.vue'
import Complete from './views/Complete.vue'



Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/RememberThePath',
      name: 'RememberThePath',
      component: RememberThePath
    },
    {
      path: '/Calculator',
      name: 'Calculator',
      component: Calculator
    },
    {
      path: '/Decoder',
      name: 'Decoder',
      component: Decoder
    },
    {
      path: '/PriceEstimator',
      name: 'PriceEstimator',
      component: PriceEstimator
    },
    {
      path: '/Cafeteria',
      name: 'Cafeteria',
      component: Cafeteria
    },
    {
      path: '/VulnerabilitySort',
      name: 'VulnerabilitySort',
      component: VulnerabilitySort
    },
    {
      path: '/Complete',
      name: 'Complete',
      component: Complete
    },


//UNUSED
    // {
    //   path: '/ClueFinder',
    //   name: 'ClueFinder',
    //   component: ClueFinder
    // },
    // {
    //   path: '/VRExplorer',
    //   name: 'VRExplorer',
    //   component: VRExplorer
    // },
    // {
    //   path: '/HangMan',
    //   name: 'HangMan',
    //   component: HangMan
    // },
    // {
    //   path: '/FamilyFeud',
    //   name: 'FamilyFeud',
    //   component: FamilyFeud
    // },
    // {
    //   path: '/PriceQuotes',
    //   name: 'PriceQuotes',
    //   component: PriceQuotes
    // },
    
    
    
  ]
})
