import Vue from 'vue';
import Vuex from 'vuex';

import currentUser from './currentUser';
import moduleLikes from './moduleLikes';
import modulePosts from './modulePosts';
import moduleUsers from './moduleUsers';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
      users: moduleUsers,
      user: currentUser,
      posts: modulePosts,
      likes: moduleLikes,
    }
});
