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
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

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

// tulsi

// required for passport
app.use(session({
  name: 'mycookie',
  secret: 'oursecret',
  resave: false,
  saveUninitialized: false
})); // session secret
app.use(passport.initialize()); //initiliazing passport with app.js
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages store




app.get('/',authcontroller.isLoggedIn,(req, res) => {
  res.render('homepage',{
    user:req.user
  });

});


require('./controllers/passport')(passport); // pass passport for configuration
//****importing  admin routes***
require('./routes/adminroutes.js')(app, passport);




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
app.use('/userlogout',userlogoutrouter);

const cartrouter =require('./routes/cart');
app.use('/cart',cartrouter);

const cartaddrouter= require('./routes/addtocart');
app.use('/add/cart',cartaddrouter);





app.listen(3000, () => {
  debug(`listening on port ${chalk.blue.bold('3000')}`);
});

