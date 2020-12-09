
/**
 * Module dependencies.
 */
require('dotenv').config()
const express = require('express');
const path = require('path');

//load mahasiswa route
const mahasiswa = require('./routes/mahasiswa');
const app = express();

const connection = require('express-myconnection');
const mysql = require('mysql');

// all environments
const PORT = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(

  connection(mysql, {

    // host: 'mysql-15399-0.cloudclusters.net', //'localhost',
    // user: 'admin',
    // password: 'superadmin',
    // port: 15399, //port mysql
    // database: 'stmik'
    host: 'localhost', //'localhost',
    user: 'stmikadmin',
    password: 'stmikadmin',
    port: 3306, //port mysql
    database: 'stmik'

  }, 'pool') //or single

);



app.get('/', mahasiswa.list);
app.get('/mahasiswa', mahasiswa.list);
app.get('/mahasiswa/add', mahasiswa.add);
app.post('/mahasiswa/add', mahasiswa.save);
app.get('/mahasiswa/delete/:id', mahasiswa.delete_mahasiswa);
app.get('/mahasiswa/edit/:id', mahasiswa.edit);
app.post('/mahasiswa/edit/:id', mahasiswa.save_edit);


app.use(app.router);

const server = new Promise(resolve => {
  const baseUrl = 'http://localhost:' + PORT
  app.listen(PORT, function () {
    resolve({
      url: baseUrl,
      pid: process.pid
    })
  })
})

module.exports = { server }
