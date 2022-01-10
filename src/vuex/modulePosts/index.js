import DB from "../../APIs"
import helper from "../../helpers/vuex";

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
                let posts = rs.posts
                const likes = rs.likes
                const comments = rs.comments
                // sort and sync data
                posts.forEach(post => {
                    post.date = helper.formatDate(post.date)
                    post.likes = likes.filter(like => like.pid === post.pid)
                    post.textLike = helper.formatInfoTextLike(getters.user, post.likes)
                    post.comments = comments.filter(cmt => cmt.pid === post.pid)
                    post.likeBoolean = post.likes.some(like => like.uid === getters.user.uid) ? true : false
                })
                // call mutations set posts
                commit("setPosts", posts) 
            }).catch((err) => {
                commit("setPosts", [{
                    content: "Failed"
                }])
            });
        }
    }
}

export default modulePosts