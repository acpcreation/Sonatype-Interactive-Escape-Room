import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue' //{ BootstrapVue, IconsPlugin }
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.config.ignoredElements = [
  'a-scene',
  'a-entity',
  'a-camera',
  'a-cursor',
  'a-box',
  'a-sky',
  'a-sphere',
  'a-cylinder',
  'a-plane'
];


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' //import font awesome icon component

// import each specific icon (WILL BE BLANK IF THEY ARE PRO)
import { faShip } from '@fortawesome/free-solid-svg-icons'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

// Add icons to the library
library.add(faShip, faUserSecret)

// Add font awesome icon component
Vue.component('font-awesome-icon', FontAwesomeIcon)



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
