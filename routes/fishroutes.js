const express= require('express');
const fishrouter= express.Router();

const mysql= require('mysql');



fishrouter.route('/').get((req,res)=>{
  const con= mysql.createConnection(
   
    {
      host:process.env.DATABASE_HOST,
      user:process.env.DATABASE_USER,
      password:process.env.DATABASE_PASSWORD,
      database:process.env.DATABASE
    }
    
  
  
  );
  con.query("SELECT * from product where pcategory='fish'",(err,result)=>{
    res.render('fishproducts',{
      result:result })
      console.log(`the result display is${result}`);
})
});

fishrouter.route('/:id').get((req,res)=>{

  const id = req.params.id;
  const con = mysql.createConnection({
  
      host:process.env.DATABASE_HOST,
      user:process.env.DATABASE_USER,
      password:process.env.DATABASE_PASSWORD,
      database:process.env.DATABASE
    

})
con.query("SELECT * from product where pcategory='fish'",(err,result)=>{
  res.render('fishdetail',{
    result:result[id] })
})


});

module.exports= fishrouter;