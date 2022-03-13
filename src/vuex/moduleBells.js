import DB from "../APIs"

const moduleBells = {
    state: {
        bells: []
    },
    mutations: {
        setBells: (state, bells) => { state.bells = bells }
    },
    getters: {
        bells: state => state.bells
    },
    actions: {
        getBells: ({ commit, getters }) => {
            DB.load("bells").getWhere("uid", getters.user.uid)
                .then(rs => commit("setBells", rs.result))
                .catch(err => commit("setBells", getters.bells))
        }
    }
}

export default moduleBells