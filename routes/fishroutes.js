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
    console.log(result);
    res.render('fishproducts',{
      result:result })
     
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
con.query("SELECT * from product where pcategory='fish' and pid=?",[id],(err,result)=>{

  console.log(result);
  res.render('fishdetail',{result:result});
  console.log(result[0].pname);
  console.log(err);
  
})

});

module.exports= fishrouter;