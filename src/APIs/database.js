import { getJSON } from "@nativescript/core/http"

import { config } from "./config"

// XmlHttpRequest
class Database {

    fetchAll (sql) {
        const target = "fetchAll.php?sql=" + sql
        return this.XmlHResquest(target)
    }
    fetch (sql) {
        const target = "fetch.php?sql=" + sql
        return this.XmlHResquest(target)
    }
    fetchColumn (sql) {
        const target = "fetchColumn.php?sql=" + sql
        return this.XmlHResquest(target)
    }
    none (sql) {
        const target = "none.php?sql=" + sql
        return this.XmlHResquest(target)
    }
    
    ast_post () {
        const target = "ast.php"
        return this.XmlHResquest(target)
    }
    // ******
    
    // async always return a promise to resolve code that async
    // XmlHResquest = async target => fetch(config.PATH_API + target)
    //     .then(rs => rs.json()).catch(err => {
    //         alert("That bai")
    //         return []
    //     })
    XmlHResquest = async target => getJSON(config.PATH_API + target)
                                        .then(rs => rs.result)
 
}

export default Database