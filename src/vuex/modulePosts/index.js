import { Dialogs } from "@nativescript/core";
import DB from "../../APIs"
import helper from "../../helpers";
import { onScheduleBells, onSchedulePost } from "../../notifications/posts-nof";

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
                    // Notifications
                    onSchedulePost(getters.posts, posts, getters.user)
                    // call mutations set posts
                    if(getters.posts != posts)
                        commit("setPosts", posts) 
                    // 
                    let bells = rs.result.bells.filter(bell => {
                        bell.actionTime = helper.posts.formatDate(bell.actionTime)
                        bell.whoimage = helper.posts.formatUrlImage(bell.whoimage)
                        return bell.uid == getters.user.uid && bell.whoname != getters.user.uname
                    })
                    onScheduleBells(getters.bells, bells)
                    commit("setBells", bells)
                } else
                    return Promise.reject()
            }).catch((err) => {
                commit("setPosts", getters.posts)
            }); 
        },
    }
}

export default modulePosts