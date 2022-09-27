// const express= require('express');
// const adminloginrouter=express.Router();
// const mysql= require('mysql');

// const bodyparser= require('body-parser');

// const encoder=  bodyparser.urlencoded();

//  const con= mysql.createConnection(

//      {
//             host: "localhost",
//             user: "root",
//             password: "",
//             database:"purrfectstorehouse"
//     });
   



// adminloginrouter.route('/').get((req,res)=>{
//     res.render('adminlogin');
// })

// adminloginrouter.route('/').post(encoder,(req,res)=>{
//     var username= req.body.username;
//     var password= req.body.password;
    

//     con.query("select * from admin where admin_email = ? and admin_password= ?",[username,password],(err,result,fields)=>{

//           if(result.length>0)
//         {
//             res.redirect("/orderdashboard");
//         }
//         else{
//             res.redirect('/admin');
//         }
//         res.end();

//     })
// })

// module.exports=adminloginrouter;