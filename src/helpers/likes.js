import DB from "../APIs"

const likes = {
    like: (user, post) => {
        DB.load("likes").insert(user.uid, post.pid)
    },
    dislike: (user, post) => {
        DB.load("likes").deleteDlWhere("uid", user.uid, "pid", post.pid)
    }
}   

export default likes