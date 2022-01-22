// Query 
import Database from "./database";

class Query extends Database {
    getAll() { // hàm này lấy tất cả dữ liệu trong bảng
        let sql = `SELECT * FROM ${this.table}`;
        return this.fetchAll(sql);
    }
    getWhere(col, value) { // hàm này lấy where dữ liệu trong bảng
        let sql = `SELECT * FROM ${this.table} where ${col} = '${value}'`;
        return this.fetchAll(sql);
    }
    getRef(table, fkey) { // hàm này lấy tất cả dữ liệu trong bảng
        let sql = `SELECT * FROM ${this.table} a, ${table} b where a.${fkey} = b.${fkey}`;
        return this.fetchAll(sql);
    }
    getRefOderBy(table, fkey, sort, type) { // hàm này lấy tất cả dữ liệu trong bảng
        let sql = `SELECT * FROM ${this.table} a, ${table} b where a.${fkey} = b.${fkey} order by ${sort} ${type}`;
        return this.fetchAll(sql);
    }
    deleteWhere(col,value){ // hàm này delete có 1 điều kiện và không trả về giá trị
        let sql = `DELETE FROM ${this.table} WHERE ${col} = '${value}'`;
        return this.none(sql);
    }
    deleteDlWhere(col1, value1, col2, value2){ // hàm này delete có 1 điều kiện và không trả về giá trị
        let sql = `DELETE FROM ${this.table} WHERE ${col1} = '${value1}' and ${col2} = '${value2}'`;
        return this.none(sql);
    }
    deleteTlWhere(col1, value1, col2, value2, col3, value3){ // hàm này delete có 1 điều kiện và không trả về giá trị
        let sql = `DELETE FROM ${this.table} WHERE ${col1} = '${value1}' and ${col2} = '${value2}' and ${col3} = '${value3}'`;
        return this.none(sql);
    }
    updateWhere(set, valueSet, col, value) {
        let sql = `UPDATE ${this.table} set ${set} = '${valueSet}' where ${col} = '${value}'`
        return this.none(sql)
    }
    updateTlWhere(set, valueSet, col1, value1, col2, value2, col3, value3) {
        let sql = `UPDATE ${this.table} set ${set} = '${valueSet}' where ${col1} = '${value1}' and ${col2} = '${value2}' and ${col3} = '${value3}'`
        return this.none(sql)
    }
}

export default Query
