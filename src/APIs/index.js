
import tables from "./tables"

class DB {
    static load(table) {
        return new tables[table]()
    }
    static messenger(table) {
        return new tables.messenger(table)
    }
}

export default DB