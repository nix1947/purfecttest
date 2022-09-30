const express= require('express');
const cartrouter = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  //password encryption
 const cookieParser= require('cookie-parser');
const authcontroller = require('../controllers/auth')
 const { promisify } = require('util');

const dotenv= require('dotenv');
dotenv.config({path:'./.env'});






cartrouter.route('/').get(authcontroller.isLoggedIn, (req, res) => {

    if (req.user) {

        res.render('cart',{
            user:req.user
        });

    }
    else {
  
        res.redirect('/');  


    }


})




// getting the product id from db
// ++++++++++++


cartrouter.route('/:id').get((req,res)=>{

   
  const id = req.params.id;
  console.log(id); //db kai pid ako cha
  const con = mysql.createConnection({
  
      host:process.env.DATABASE_HOST,
      user:process.env.DATABASE_USER,
      password:process.env.DATABASE_PASSWORD,
      database:process.env.DATABASE
    

})
con.query("SELECT * from product where pid=?",[id],(err,result)=>{
    res.render('cart');

})
});


module.exports= cartrouter;




  




// ***********






  
   


// con.query("SELECT * from product where pid='?'",[id],(err,result)=>{
//   res.render('cart',{
//     result:result })


module.exports= cartrouter;



