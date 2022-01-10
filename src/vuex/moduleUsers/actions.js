import DB from "../../APIs";

export default  {
    getUsers: ({ commit }) => {
        DB.load("users").getAll()
            .then(rs => commit("getUsers", rs.result))
            .catch((err) => commit("getUsers", [{uname: "Failed"}]));    
    }
}