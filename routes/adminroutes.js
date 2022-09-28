const { session } = require("passport");

module.exports = function(app, passport) {

	
	// show the login form
	app.get('/admin', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('adminlogin');
	});

	// process the login form
	app.post('/admin', passport.authenticate('local-login', {
            successRedirect : '/orderdashboard', // redirect to the secure profile section
            failureRedirect : '/admin', // redirect back to the signup page if there is an error
        
		}),
        function(req, res) {
            console.log("hello");

            if (req.body.remember) {
              req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
              req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

	app.get('/orderdashboard', isLoggedIn, function(req, res) {
		res.render('adminorders_dashboard', {
			user : req.user // get the user out of session and pass to template
		});
	});


	app.get('/orderdetails',isLoggedIn, (req, res) => {
		res.render('adminorder_details');
		user : req.user


	  })
	  
	  app.get('/catview',isLoggedIn, (req, res) => {
		res.render('admincat_view');
		user : req.user
	

	  })
	  
	  app.get('/addpage',isLoggedIn, (req, res) => {
		res.render('adminadd_page');
		user : req.user
	  })
	  
	  app.get('/updatepage',isLoggedIn, (req, res) => {
		res.render('adminupdate_page');
		user : req.user
	  })
	  
	  app.get('/fishview',isLoggedIn, (req, res) => {
		res.render('adminfish_view');
		user : req.user
	  })
	  
	  app.get('/productdetail',isLoggedIn, (req, res) => {
		res.render('adminproduct_details');
		user : req.user
	  })
	  
	  app.get('/dogview', isLoggedIn,(req, res) => {
		res.render('admindogs_view');
		user : req.user
	  })

	app.get('/logout', function(req, res) {
		
		req.session.destroy(function (err) {
			res.clearCookie();
			res.redirect('/admin'); 
		  });
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
