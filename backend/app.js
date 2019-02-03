const express = require("express");


const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// app.post("/api/posts", (req, res, next) => {
//   const post = req.body;
//   console.log(post);
//   res.status(201).json({
//     message: 'Post added successfully'
//   });
// });

// app.get("/api/posts", (req, res, next) => {
//   const posts = [
//     {
//       id: "fadf12421l",
//       title: "First server-side post",
//       content: "This is coming from the server"
//     },
//     {
//       id: "ksajflaj132",
//       title: "Second server-side post",
//       content: "This is coming from the server!"
//     }
//   ];
//   res.status(200).json({
//     message: "Posts fetched successfully!",
//     posts: posts
//   });
// });


var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'ARON'
});

var jsons = {};
var js = {};
var jsfix = {};

connection.query('SELECT * from Product', function (err, rows, fields) {
    if (err) throw err
    jsons = rows;
    console.log('The solution is: ', rows);
    
  js = JSON.stringify(rows);
  console.log("---------------");
  console.log(js);
  });

 

  connection.query('SELECT * from Fixtures', function (err, rows, fields) {
    if (err) throw err
    
    console.log('The solution is: ', rows);
    
  jsfix = JSON.stringify(rows);
  console.log("---------------");
  console.log(jsfix);
  });

  //connection for insert into database
  
 // INSERT INTO `Fixtures`(`id`, `fixture_name`, `fixture_cost`) VALUES ([value-1],[value-2],[value-3])
   

   app.post("/api/fix",(req,res,next)=>{
     const productsave = req.body;
     console.log(productsave.id);
     let stmt = "INSERT INTO `Fixtures`(`id`, `fixture_name`, `fixture_cost`) VALUES (?,?,?)";
     let gotvalues = [productsave.id,productsave.fixture_name,productsave.fixture_cost];
   
     connection.query(stmt,gotvalues, function (err, rows, fields) {
      if (err) throw err
      
      console.log('The solution is: ', rows);
    });
     console.log(gotvalues);
  
    
   // console.log('The solution is: ', rows);
    
 
     res.status(201).json({
       message:"product added successfully"
     });

   });

   app.get("/api/fix",(req,res,next)=>{
      res.send(jsfix);
      console.log(jsfix);
   });

  app.get("/api/data", (req,res,next)=>{
     //sends the json data to the front end whenever this url is called
     res.send(js);
  });


module.exports = app;