const express = require('express');
const authcontroller = require('../controllers/auth');

const userprofilerouter = express.Router();



userprofilerouter.route('/').get(authcontroller.isLoggedIn, (req, res) => {

    if (req.user) {

        res.render('userprofile',{
            user:req.user
        });

    }
    else {
  
        res.redirect('/');  


    }


})

module.exports = userprofilerouter;