const express= require('express');
const cartaddrouter = express.Router();

const mysql = require('mysql');

const authcontroller = require('../controllers/auth')


const dotenv= require('dotenv');
dotenv.config({path:'./.env'});

// database connection

const con = mysql.createConnection({
  
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
  

})



// add to cart get 


cartaddrouter.route('/').get(authcontroller.isLoggedIn, (req, res) => {

   

    if (req.user) {


        if(!req.params.id){
            res.send("product not selected to add in cart");
            return;
            
        }
        res.render('addtocart',{
            user:req.user
        });

    }
    else {
  
        res.redirect('/');  


    }


})




// getting the product id from routes id which is also the productid in database


cartaddrouter.route('/:id').get((req,res)=>{

   
  const id = req.params.id;
  console.log(id); //db kai pid ako cha
  const con = mysql.createConnection({
  
      host:process.env.DATABASE_HOST,
      user:process.env.DATABASE_USER,
      password:process.env.DATABASE_PASSWORD,
      database:process.env.DATABASE
    

})



con.query("SELECT * from product where pid=?",[id],(err,result)=>{

    if(err){
       res.send("Error while fetching product");
       return; 
    }

    if (result.length <= 0) {
        res.send("Not able to add items in cart");
        return;
    }

    res.render('addtocart',{
        result:result[0]
    });

})

});



// add to cart post

cartaddrouter.route('/').post(authcontroller.isLoggedIn,(req,res)=>{
   
    
    if (req.user) {

        console.log(req.user);

        res.render('addtocart',{
            user:req.user
        });

    }
    else {
  
        res.redirect('/');  


    }


    // let {productID,quantity}= req.body;
    let productId = req.body.productId;
    let quantity = req.body.quantity;
    let result;
    

    console.log(`the product result id is ${productId} and quantity is ${quantity}`);
    if(!productId){
        res.send("please order a valid product");
        return;
    }

    if(!quantity||quantity<=0)
    {
        res.send("please input a valid quantity");
        return;
    }

   // sabbai right bhayo bhane
    con.query("select * from product where pid=?",[productId],(err,result)=>{
        console.log(` the product result is ${result}`);
        if(err){
            res.send("server error while fetching product");
            return;
        }
      
        
        if (result.length <= 0) {
            res.send("Product not found in store");
            return;
        }

        result=result[0];
        // console.log(` the product is ${result}`);
   
// ******problem is from here******

        let sql="insert into cart(user_id,pid,quantity) values(?)";
        let columns=[req.user.user_id,result.pid,quantity]
       
        // add to cart
        con.query(sql,[columns],(err,result)=>{
            if(err)
            {
                res.send("server error on adding to cart database");
                return;
            }

            //on successful redirect to homepage
            res.render('cart',{
                result:result
            })
        })

    });

});

module.exports=cartaddrouter;