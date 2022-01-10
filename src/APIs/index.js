import tables from "./tables"

class DB {
    static load(table) {
        return new tables[table]()
    }
}

export default DB