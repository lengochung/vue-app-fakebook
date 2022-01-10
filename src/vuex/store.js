import Vue from 'vue';
import Vuex from 'vuex';

import currentUser from './currentUser';
import modulePosts from './modulePosts';
import moduleUsers from './moduleUsers';


// import localStorage from 'nativescript-localstorage';

// const NSVuexPersistent = store => {
//   let storageStr = localStorage.getItem('ns-vuex-persistent');
//   if (storageStr) {
//       store.replaceState(JSON.parse(storageStr))
//   }
//   store.subscribe((mutation, state) => {
//       // Suscribe hook.
//       localStorage.setItem('ns-vuex-persistent', JSON.stringify(state));
//   })
// };

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      users: moduleUsers,
      user: currentUser,
      posts: modulePosts
    }
});
