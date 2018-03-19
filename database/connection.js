const mysql = require('mysql');
const conData = require('./conData');

const con = mysql.createConnection(conData);

module.exports = con;
