import Vue from 'nativescript-vue'

import Run from "./components/Run"

import store from './vuex/store'

import { TNSFontIcon, fonticon } from 'nativescript-fonticon'
import RadListView from 'nativescript-ui-listview/vue'
import BottomNavigation from '@nativescript-community/ui-material-bottom-navigation/vue';

// require ("nativescript-local-notifications");

TNSFontIcon.debug = true;
TNSFontIcon.paths = { fa: './assets/css/fontawesome.min.css', far: './assets/css/regular.min.css', fas: './assets/css/solid.min.css', fab: './assets/css/brand.min.css' }
TNSFontIcon.loadCss() 
Vue.filter('fonticon', fonticon) 

// Prints Vue logs when --env.production is *NOT* set while building

// Vue.config.silent = (TNS_ENV === 'production')
Vue.config.silent = false
// Vue.config.devtools = true

Vue.use(RadListView)
Vue.use(BottomNavigation);

// Vue.registerElement('CardView',() => require('nativescript-cardview').CardView); 


new Vue({
  store,
  render: h => h('frame', [h(Run)])
}).$start();