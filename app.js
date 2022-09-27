const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('petshopstore');
const morgan = require('morgan');
const path = require('path');
const bodyparser= require('body-parser');
const mysql= require('mysql');
const dotenv= require('dotenv');
const cookieParser= require('cookie-parser');
const authcontroller= require('./controllers/auth');

dotenv.config({path:'./.env'});

const app = express(); //object instantiated
app.set('view engine', 'ejs'); //registering ejs (view engine)


//establishing(creating) db connection
 const db=mysql.createConnection(
  {
  host:process.env.DATABASE_HOST,
  user:process.env.DATABASE_USER,
  password:process.env.DATABASE_PASSWORD,
  database:process.env.DATABASE
}
)
db.connect((error)=>{

  if(error){
    debug('error in connecting database');
  }
  else{
    debug('database connected succesfully')
  }
})


app.use(morgan('tiny')); // middleware
app.use(express.static(path.join(__dirname, './public')));
app.use('/css',express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

app.use('/js',express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());//cookies haru use garna
//homepage ko chuttai route banauna baki cha

app.get('/',authcontroller.isLoggedIn,(req, res) => {
  res.render('homepage',{
    user:req.user
  });

});

//****importing routes***

const catrouter = require('./routes/catroutes');
app.use('/catproducts', catrouter);

const dogrouter= require('./routes/dogroutes');
app.use('/dogproducts',dogrouter);

const fishrouter= require('./routes/fishroutes');
app.use('/fishproducts',fishrouter);

const loginrouter= require('./routes/loginroutes');
app.use('/login',loginrouter);

const signuprouter= require('./routes/signuproutes');
app.use('/signup',signuprouter);

// const adminloginrouter= require('./routes/adminlogin');
// app.use('/admin',adminloginrouter);

const userprofilerouter= require('./routes/userprofile');
app.use('/profile',userprofilerouter);
// const landingpagerouter= require('./routes/landingpageroute'); //login bhaye pachi balla dekhinu parne page ho yo  
// app.use('/landingpage',landingpagerouter);

const userlogoutrouter= require('./routes/userlogout');
app.use('/logout',userlogoutrouter);
// admin routes start//

app.get('/orderdashboard',(req,res)=>{   //eni haruko chuttai routes chai banai sakeko chaina aile lai pachi banaune routes folder ma banayera
    res.render('adminorders_dashboard');
})

app.get('/orderdetails',(req,res)=>{
  res.render('adminorder_details');
})

app.get('/catview',(req,res)=>{
  res.render('admincat_view');
})

  app.get('/addpage',(req,res)=>{
    res.render('adminadd_page');
  })

  app.get('/updatepage',(req,res)=>{
    res.render('adminupdate_page');
  })

    app.get('/fishview',(req,res)=>{
      res.render('adminfish_view');
})

app.get('/productdetail',(req,res)=>{
  res.render('adminproduct_details');
})

app.get('/dogview',(req,res)=>{
  res.render('admindogs_view');
})


app.listen(3000, () => {
  debug(`listening on port ${chalk.blue.bold('3000')}`);
});

