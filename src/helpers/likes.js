import DB from "../APIs"

const likes = {
    like: (user, post) => {
        return DB.load("likes").insert(user.uid, post.pid)
    },
    dislike: (user, post) => {
        return DB.load("likes").deleteDlWhere("uid", user.uid, "pid", post.pid)
    }
} 


export default likes