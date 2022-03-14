
import Query from "./query";

// List tables on database
const tables = {
    users: class extends Query { 
        table = "users" 
        insert(uname, username, password) {
            let sql = `insert into ${this.table} values(null, '${uname}', 0, 'None', 'default.png', 0, 2, 0, '${username}', '${password}')`
            return this.none(sql) 
        }
    },
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
            let sql = `insert into ${this.table} values(null, '${uid}', '${pid}', '${whoname}', '${action}', '${whoimage}', 0, null)`
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
        
        insert(toUser, message, photo, type) {
            if(photo == '.png')
                photo = ''
            let sql = `insert into ${this.table} values(null,'${toUser.uid}','${message}','${photo}',null, '${type}',0);`
            // let sqlRecieve = `insert into messenger_${toUser.username} values(null,'${user.uid}','${message}','${photo}',null, 'recieve',0);`
            return this.none(sql)
        }

        seen(uid) {
            return this.updateWhere('seen', 1, 'uid', uid)
        }

        create() {
            let sql = `CREATE TABLE ${this.table} (mid int(11) NOT NULL, uid int(11) NOT NULL, message text COLLATE utf8_unicode_ci NOT NULL DEFAULT '', photo text COLLATE utf8_unicode_ci NOT NULL DEFAULT '', timeSend timestamp NOT NULL DEFAULT current_timestamp(), type text COLLATE utf8_unicode_ci NOT NULL, seen int(11) NOT NULL DEFAULT 0) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci; ALTER TABLE ${this.table} ADD PRIMARY KEY (mid); ALTER TABLE ${this.table} MODIFY mid int(11) NOT NULL AUTO_INCREMENT;`
                
            return this.none(sql)
        }
    }
}

export default tables