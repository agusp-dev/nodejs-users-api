const mysql = require('mysql')

var conn = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'your-bd-password',
    database: 'nodeusers'
})

module.exports = conn