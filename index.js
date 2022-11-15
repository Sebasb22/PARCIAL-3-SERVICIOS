const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
//Configuring express server
app.use(bodyparser.json());

//MySQL details
var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'practica_serv',
  multipleStatements: true
  });

  mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

    //Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}..`));


//Creating GET Router to fetch all the learner details from the MySQL Database
app.get('/libros' , (req, res) => {
  mysqlConnection.query('SELECT * FROM books', (err, rows, fields) => {
  if (!err)
  res.send(rows);
  else
  console.log(err);
  })
  } );

  //Router to GET specific learner detail from the MySQL database
app.get('/libros/:id' , (req, res) => {
  mysqlConnection.query('SELECT * FROM books WHERE id = ?',[req.params.id], (err, rows, fields) => {
  if (!err)
  res.send(rows);
  else
  console.log(err);
  })
  } );

  //Router to DELETE a learner's detail
app.delete('/libros/:id', (req, res) => {
  mysqlConnection.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, rows, fields) => {
  if (!err)
  res.send('Learner Record deleted successfully.');
  else
  console.log(err);
  })
  });

//Router to UPDATE a learner's detail
app.put('/libros/:id', (req, res) => {
  let libro = req.body;
  mysqlConnection.query('UPDATE books SET titulo = ?, descripcion = ?, autor = ? WHERE id = ?', [libro.titulo, libro.descripcion, libro.autor, libro.id], (err, rows, fields) => {
  if (!err)
  res.send('Edito!!');
  else
  console.log(err);
  })
  });

  //Router to UPDATE a learner's detail
app.post('/libros', (req, res) => {
  var libro = req.body;
  mysqlConnection.query('INSERT INTO books (id, titulo, descripcion, autor) VALUES (?, ?, ?, ?)', [libro.id, req.params.titulo, libro.descripcion, libro.autor],(err, rows, fields) => {
  if (!err)
  res.send('Creo!');
  else
  console.log(err);
  })
  });