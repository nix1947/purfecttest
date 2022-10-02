const express = require('express');
const catrouter = express.Router();
const mysql= require('mysql');

catrouter.route('/').get((req, res) => {
 var con=  mysql.createConnection(

{
  host:process.env.DATABASE_HOST,
  user:process.env.DATABASE_USER,
  password:process.env.DATABASE_PASSWORD,
  database:process.env.DATABASE
} 
  
  );
con.query("SELECT * from product where pcategory='cat'",(err,result)=>{
  res.render('catproducts',{result:result});
})
  
});

//**********


catrouter.route('/:id').get((req, res) => {
  const id = req.params.id;
  var con=  mysql.createConnection(
  
{
  host:process.env.DATABASE_HOST,
  user:process.env.DATABASE_USER,
  password:process.env.DATABASE_PASSWORD,
  database:process.env.DATABASE
   
}  
   );
 
   con.query("SELECT * from product where pcategory='cat' and pid=?",[id],(err,result)=>{
    res.render('catproductdetail',{result:result});
   });
  });

module.exports = catrouter;