import DB from "../../APIs"
import helper from "../../helpers";

const modulePosts = {
    state: {
        posts: []
    },
    getters: {
        posts: state => state.posts
    },
    mutations: {
        setPosts (state, posts) {
            state.posts = posts
        }
    },
    actions: {
        getPosts ({ commit, getters }) {
            DB.load("posts").ast_post().then(rs => {
                if(rs.status) {
                    let posts = rs.result.posts
                    // sort and sync data 
                    posts = helper.posts.formatPosts(posts, getters.user, rs.result.likes, rs.result.comments)
                    // call mutations set posts
                    commit("setPosts", posts) 
                } else
                    return Promise.reject()
            }).catch((err) => {
                commit("setPosts", getters.posts)
            }); 
        },
    }
}

export default modulePosts