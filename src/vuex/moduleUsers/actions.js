import DB from "../../APIs";

export default  {
    getUsers: ({ commit, getters }) => {
        DB.load("users").getAll()
            .then(rs => commit("getUsers", rs.result))
            .catch((err) => commit("getUsers", getters.users));
    }
}