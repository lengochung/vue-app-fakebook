import DB from "../../APIs"
import helper from "../../helpers"

const currentUser = {
    state: {
        user: {}
    },
    getters: {
        user: state => state.user
    },
    mutations: {  
        setLogin (state, user) {
            user.image = helper.posts.formatUrlImage(user.image)
            state.user = user
        },
        setLogout (state) {
            state.user = {}
        },
    }
}

export default currentUser