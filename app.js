const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');

const con = require('./database/connection');
const queries = require('./database/queries');
const conData = require('./database/conData');

const port = process.env.PORT || 3000;
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/assets', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Check connection
con.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});


// opening site - index.ejs, sign in site
app.get('/', function(req, res) {
  res.render('index');
});


//create user
app.post('/indexUser', urlencodedParser, function(req, res) {
  con.query(queries.createAccount(req.body.c_login, req.body.c_pass), (err, results) => {
    if (err) throw err;
    res.render('indexUser', { Login: req.body.c_login});
  });
});


// app.post('/indexUser', urlencodedParser, function(req, res) {
//     con.query(queries.createAccount(req.body.c_login, req.body.c_pass), (err, result) => {
//       if (err) throw err;
//       console.log('User created!');
//     });
//     con.query(queries.grandPrivilages(req.body.c_login), (err, result) => {
//       if (err) throw err;
//       console.log('User get privileges');
//     });
//     con.query(queries.flushPrivilages, (err, result) => {
//       if (err) throw err;
//       res.render('indexUser', { Login: req.body.c_login});
//     });
// });


// if sign in corretly there is welcome site
app.post('/welcome', urlencodedParser, function(req, res) {
  con.query(queries.signInQuery(req.body.login, req.body.pass), (err, result) => {
    if (result.length === 0) {
      res.render('indexErr', { User: req.body.login });
    } else {
      res.render('welcome', { User: req.body.login });
    }
  });
});


// app.post('/welcome', urlencodedParser, function(req, res) {
//
//   con.changeUser({
//     user: req.body.login,
//     password: req.body.pass,
//     stringifyObjects: true
//   }, function(err) {
//     if (err) {
//           con.destroy();
//           res.send('404');
//           con.connect();
//           console.log('Connected after 404');
//         } else {
//           res.render('welcome', { User: req.body.login });
//           console.log('Hello '+ req.body.login);
//         }
//   });
// });


// log out
app.get('/logOut', function(req, res) {
      res.render('index');
  });


// render welcome from back to mainpage.
app.get('/welcome', function(req, res) {
   res.render('welcome', { User: '' });
});


// inormation about first team
app.get('/firstTeam', function(req, res) {
  con.query(queries.playersPrimaryData, (err, result) => {
    if (err) throw err;
    res.render('firstTeam', { firstTeam: result });
  })
});


app.get('/addPlayer', function(req, res) {
    res.render('addPlayer');
});


app.get('/playerQuery', function(req, res) {
  res.render('playerQuery');
});


app.get('/playerQuery/:id', function(req, res) {
  con.query(queries.selectPlayer(req.query.Player), (err, result) => {
    if (err) throw err;
    res.render('playerInfo', { ID: req.params.id, QueryResult: result });
  });
});


// add player form and sucesfull add site
app.post('/addPlayerData', urlencodedParser, function(req, res) {
  con.query(queries.addPlayer(
    req.body.position,
    req.body.firstname,
    req.body.lastname,
    req.body.playerNum,
    req.body.strFoot,
    req.body.nation,
    req.body.coach
  ), (err, result) => {
    if (err) throw err;
  })
  res.render('addPlayerSuccess', { player: req.body });
});


// save playerList to file
app.get('/getFile', function(req, res) {
  const filePath = __dirname + '/files/playersList.txt';
  const writeFile = fs.createWriteStream(filePath);
  con.query(queries.playersPrimaryData, (err, result) => {
    if (err) throw err;
    //writeFile.write(result.forEach( player => JSON.stringify(player)));
    const pText = [];
    const playerFile = result.forEach(player => pText.push(JSON.stringify(player)));
    writeFile.write(pText.join(String.fromCharCode(10)));
    res.render('firstTeam', { firstTeam: result });
  });
});


app.listen(port);
