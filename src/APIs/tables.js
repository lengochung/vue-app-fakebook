
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
            return this.none(sql)
        } 
    },
    comments: class extends Query { 
        table = "comments";
        insert (uid, pid, comment) {
            let sql = `insert into ${this.table} values(null, '${uid}', '${pid}', '${comment}', null)`
            return this.none(sql)
        }
    },
    bells: class extends Query {
        table = "bells";
        insert (uid, pid, whoname, action, whoimage) {
            let sql = `insert into ${this.table} values(null, '${uid}', '${pid}', '${whoname}', '${action}', '${whoimage}', '', null)`
            return this.none(sql)
        }
    },
    messenger: class extends Query {
        constructor(table) {
            super()
            this.table = 'messenger_' + table
        }
        getMessages() {
            const target = "messages.php?table=" + this.table
            return this.XmlHResquest(target)
        }
        create() {
            
        }
    }
}

export default tables