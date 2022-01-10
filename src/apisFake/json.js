const data = [
    {
        "uname": "From json"
    }
]
//*** */
let sql = "SELECT * from users"
fetch("http://reactjsfeeds.000webhostapp.com/APIs/executes/fetchAll.php?sql=" + sql)
    .then(rs => rs.json())
    .then(rs => console.log(rs))
    .catch(err => console.log("Failed"))
// fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(rs => rs.json())
//     .then(rs => console.log(rs))
//     .catch(err => console.log("Failed"))
// let http = new XMLHttpRequest()
// http.open("GET",'https://jsonplaceholder.typicode.com/todos/1', false)
// http.send(null)

// console.log(JSON.parse(http.responseText).title);

// export default data