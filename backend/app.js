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
var jsfixpart = {};
var jsfixpurchasepart = {};

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

  connection.query('SELECT * from Fixture_parts', function (err, rows, fields) {
    if (err) throw err
    
    jsfixpurchasepart = JSON.stringify(rows);
  console.log("---------------");
  console.log(jsfixpurchasepart);
  });

  connection.query('SELECT * from PO_Parts', function (err, rows, fields) {
    if (err) throw err
    
    jsfixpart = JSON.stringify(rows);
  console.log("---------------");
  console.log(jsfixpart);
  });
  //connection for insert into database
  
 
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
  
     res.status(201).json({
       message:"product added successfully"
     });

   });


   app.post("/api/fix/part",(req,res,next)=>{
    const productsave = req.body;
    console.log(productsave.id);
    let stmt = "INSERT INTO `Fixture_parts`(`id`, `fixture_id`, `part_id`,`quant`) VALUES (?,?,?,?)";
    let gotvalues = [productsave.id,productsave.fixture_id,productsave.part_id,productsave.quant];
    
    connection.query(stmt,gotvalues, function (err, rows, fields) {
     if (err) throw err
     
     console.log('The solution is: ', rows);
   });
    console.log(gotvalues);
 
    res.status(201).json({
      message:"fixture part added successfully"
    });

  });

  app.post("/api/purchase/part",(req,res,next)=>{
    const productsave = req.body;
    console.log(productsave.id);
    let stmt = "INSERT INTO `PO_Parts`(`id`,`part_id`,`quant`) VALUES (?,?,?)";
    let gotvalues = [productsave.id,productsave.part_id,productsave.quant];
    
    connection.query(stmt,gotvalues, function (err, rows, fields) {
     if (err) throw err
     
     console.log('The solution is: ', rows);
   });
    console.log(gotvalues);
 
    res.status(201).json({
      message:"purchase part added successfully"
    });

  });

   //-------------PRODUCT ADD ----------------------------
   app.post("/api/data",(req,res,next)=>{
    const productsave = req.body;
    console.log(productsave.ProductID);
    let stmt = "INSERT INTO `Product`(`ProductID`, `part_name`, `part_description`, `part_vendor`, `part_cost`, `part_quant`, `Price`) VALUES (?,?,?,?,?,?,?)";
    let gotvalues = [productsave.ProductID,productsave.part_name,productsave.part_description,productsave.part_vendor,productsave.part_cost,productsave.part_quant,productsave.Price];
  
    connection.query(stmt,gotvalues, function (err, rows, fields) {
     if (err) throw err
     
     console.log('The solution is: ', rows);
   });

    console.log(gotvalues);
   
     connection.query('SELECT * from Product', function (err, rows, fields) {
     if (err) throw err
     });
    res.status(201).json({
      message:"product added successfully"
    });

  });

   app.delete("/api/data/:id",(req,res,next)=>{
   // DELETE FROM `Product` WHERE `ProductID`
   console.log(req.params.id);
   let stmt = "DELETE FROM `Product` WHERE `ProductID` = ?";
     let gotvalues = [req.params.id];
     connection.query(stmt,gotvalues, function (err, rows, fields) {
      if (err) throw err
       console.log("product deleted from the database");
    });
     res.status(200).json({
       message:"deleted the product"
     });
   });

   app.get("/api/purchase/part",(req,res,next)=>{
     res.send(jsfixpurchasepart);
   })

   app.get("/api/fix",(req,res,next)=>{
      res.send(jsfix);
      console.log(jsfix);
   });
   app.get("/api/fix/part",(req,res,next)=>{
      res.send(jsfixpart);
      console.log(jsfixpart);
   });

   app.delete("/api/fix/:id",(req,res,next)=>{
    // DELETE FROM `Product` WHERE `ProductID`
    console.log(req.params.id);
    let stmt = "DELETE FROM `Fixtures` WHERE `id` = ?";
      let gotvalues = [req.params.id];
      connection.query(stmt,gotvalues, function (err, rows, fields) {
       if (err) throw err
        console.log("fixture deleted from the database");
     });
     connection.query('SELECT * from Fixtures', function (err, rows, fields) {
      if (err) throw err
      
      console.log('The solution is: ', rows);
    });
      res.status(200).json({
        message:"deleted the fixture"
      });
    })
   

  app.get("/api/data", (req,res,next)=>{
     //sends the json data to the front end whenever this url is called
     res.send(js);
  });




module.exports = app;