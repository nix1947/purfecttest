// const express = require('express');
// const dogrouter = express.Router();
// const mysql = require('mysql');
// const dotenv= require('dotenv');
// dotenv.config({path:'./.env'});
// dogrouter.route('/').get((req, res) => {

//   const con = mysql.createConnection(
   
//     {
//       host:process.env.DATABASE_HOST,
//       user:process.env.DATABASE_USER,
//       password:process.env.DATABASE_PASSWORD,
//       database:process.env.DATABASE
//     }
    
//     );
//   con.query("SELECT * from product where pcategory='dog'", (err, result) => {

//     res.render('dogproducts',{ result: result });
//   })

// });

// dogrouter.route('/:id').get((req, res) => {

//   const id = req.params.id;
//   const con = mysql.createConnection(

//   {
//     host:process.env.DATABASE_HOST,
//     user:process.env.DATABASE_USER,
//     password:process.env.DATABASE_PASSWORD,
//     database:process.env.DATABASE
//   }
  
//   )
//   con.query("SELECT * from product where pcategory='dog' and pid=?",[id],(err,result)=>{
//     res.render('dogproductdetail',{result:result})
//   })


// });

// module.exports = dogrouter;







const { request } = require('express');
const express= require('express');
const dogrouter= express.Router();

const mysql= require('mysql');

dogrouter.route('/').get((req,res)=>{
  const con= mysql.createConnection(
   
    {
      host:process.env.DATABASE_HOST,
      user:process.env.DATABASE_USER,
      password:process.env.DATABASE_PASSWORD,
      database:process.env.DATABASE
    }
    
  
  
  );
  con.query("SELECT * from product where pcategory='dog'",(err,result)=>{
    console.log(result);
    res.render('dogproducts',{
      result:result })
     
})
});


dogrouter.route('/:id').get((req,res)=>{

  const id = req.params.id;
  const con = mysql.createConnection({
  
      host:process.env.DATABASE_HOST,
      user:process.env.DATABASE_USER,
      password:process.env.DATABASE_PASSWORD,
      database:process.env.DATABASE
    

})
con.query("SELECT * from product where pcategory='dog' and pid=?",[id],(err,result)=>{

  console.log(result);
  res.render('dogproductdetail',{result:result});
  console.log(result[0].pname);
  console.log(err);
  
})


})
module.exports= dogrouter;