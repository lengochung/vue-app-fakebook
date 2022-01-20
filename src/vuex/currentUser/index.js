import DB from "../../APIs"
import helper from "../../helpers"

const currentUser = {
    state: {
        user: {
            uid: 0
        }
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
            DB.load("users").updateWhere("status", 0, "uid", state.user.uid)
                .then((result) => {
                    state.user = {}
                }).catch((err) => {
                    
                });
        },
    }
}

export default currentUser