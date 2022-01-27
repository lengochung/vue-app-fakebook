import helper from "../../helpers"
export default  {
    getUsers (state, users) {
        users = helper.posts.formatUrlImageList(users)
        state.users = users.filter(user => user.role != '1')
    }
}