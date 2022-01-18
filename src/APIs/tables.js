import Query from "./query";

// List tables on database
const tables = {
    users: class extends Query { table = "users" },
    posts: class extends Query { 
        table = "posts";
        insert (uid, content, image) {
            let sql = `insert into ${this.table} values(null,'${uid}','','${content}','${image}',0,0, null)`
            return this.none(sql) 
        }
    },
    likes: class extends Query { 
        table = "likes"
        insert(uid, pid) {
            let sql = `insert into ${this.table} values(null, '${uid}', '${pid}')`
            this.none(sql)
        } 
    },
    comments: class extends Query { 
        table = "comments";
        insert (uid, pid, comment) {
            let sql = `insert into ${this.table} values(null, '${uid}', '${pid}', '${comment}', null)`
            this.none(sql)
        }
    },
}

export default tables