import DB from "../../APIs"

const currentUser = {
    state: {
        user: {}
    },
    getters: {
        user: state => state.user
    },
    mutations: {
        
        setLogin (state, user) {
            state.user = user
        }
    }
}

export default currentUser