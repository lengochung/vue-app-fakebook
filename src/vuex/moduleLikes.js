import DB from "../APIs"

const moduleLikes = {
    state: {},
    mutations: {
        like(contenxt, uid, pid) {
            DB.load("likes").insert(uid, pid)
        },
        dislike(context, uid, pid) {
            DB.load("likes").deleteDlWhere("uid", uid, "pid", pid)
        }
    },
    getters: {},
    actions: {
        like(contenxt, uid, pid) {
            DB.load("likes").insert(uid, pid)
        },
        dislike(context, uid, pid) {
            DB.load("likes").deleteDlWhere("uid", uid, "pid", pid)
        }
    }
}

export default moduleLikes