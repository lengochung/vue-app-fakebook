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
        setPassword(state, password) {
            state.user.password = password
        },
        setImage(state, image) {
            state.user.image = image
        },
        uname(state, uname) {
            state.user.uname = uname
        },
        nickname(state, nickname) {
            state.user.nickname = nickname
        },
        phone(state, phone) {
            state.user.phone = phone
        },
        gender(state, gender) {
            state.user.gender = gender
        }
    }
}

export default currentUser