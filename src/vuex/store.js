import Vue from 'vue';
import Vuex from 'vuex';

import currentUser from './currentUser';
import moduleBells from './moduleBells'; 
import moduleLikes from './moduleLikes';
import moduleMessenger from './moduleMessenger';
import modulePosts from './modulePosts';
import moduleUsers from './moduleUsers';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      users: moduleUsers,
      user: currentUser,
      posts: modulePosts,
      likes: moduleLikes,
      bells: moduleBells,
      messages: moduleMessenger
    }
});
