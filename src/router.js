import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import RememberThePath from './views/RememberThePath.vue'
import Calculator from './views/Calculator.vue'
import ClueFinder from './views/ClueFinder.vue'
import VRExplorer from './views/VRExplorer.vue'
import Decoder from './views/Decoder.vue'
import PriceQuotes from './views/PriceQuotes.vue'
import FamilyFeud from './views/FamilyFeud.vue'
import HangMan from './views/HangMan.vue'


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
      path: '/ClueFinder',
      name: 'ClueFinder',
      component: ClueFinder
    },
    {
      path: '/VRExplorer',
      name: 'VRExplorer',
      component: VRExplorer
    },
    {
      path: '/Decoder',
      name: 'Decoder',
      component: Decoder
    },
    {
      path: '/PriceQuotes',
      name: 'PriceQuotes',
      component: PriceQuotes
    },
    {
      path: '/HangMan',
      name: 'HangMan',
      component: HangMan
    },
    {
      path: '/FamilyFeud',
      name: 'FamilyFeud',
      component: FamilyFeud
    },
    
    
    
    
  ]
})
