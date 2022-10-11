const { session } = require("passport");


module.exports = function (app, passport) {


	// show the login form
	app.get('/admin', function (req, res) {

		// render the page and pass in any flash data if it exists
		res.render('adminlogin');
	});

	// process the login form
	app.post('/admin', passport.authenticate('local-login', {
		successRedirect: '/orderdashboard', // redirect to the secure profile section
		failureRedirect: '/admin', // redirect back to the signup page if there is an error

	}),
		function (req, res) {
			console.log("hello");

			if (req.body.remember) {
				req.session.cookie.maxAge = 1000 * 60 * 3;
			} else {
				req.session.cookie.expires = false;
			}
			res.redirect('/');
		});

	app.get('/orderdashboard', isLoggedIn, function (req, res) {
		res.render('adminorders_dashboard', {
			user: req.user // get the user out of session and pass to template
		});
	});


	app.get('/orderdetails', isLoggedIn, (req, res) => {
		res.render('adminorder_details');
		user: req.user


	})

	app.get('/catview', isLoggedIn, (req, res) => {
		res.render('admincat_view');
		user: req.user


	})

	//get cat products from database
	app.get('/catview', isLoggedIn, (req, res) => {
		let sqlQuery = "select * from product where pcategory='cat'";
		let query = con.query(sqlQuery, (err, rows) => {
			if (err) throw err;
			res.render('admincat_view', {
				catproducts: rows

			});
		});
	});


	app.get('/productdetails/:id/', isLoggedIn, (req, res) => {
		console.log(req.params.id);
		con.query('select * from product where pid=?', [req.params.id], (err, rows) => {
			if (err) throw err;
			res.render('adminproduct_details', {
				result: rows

			});
		});
	});

	app.get('/addpage', isLoggedIn, (req, res) => {
		res.render('adminadd_page');
		user: req.user
	})

	app.get('/updatepage', isLoggedIn, (req, res) => {
		res.render('adminupdate_page');
		user: req.user
	})

	app.get('/fishview', isLoggedIn, (req, res) => {
		res.render('adminfish_view');
		user: req.user
	})

	app.get('/productdetail', isLoggedIn, (req, res) => {
		res.render('adminproduct_details');
		user: req.user
	})

	app.get('/dogview', isLoggedIn, (req, res) => {
		res.render('admindogs_view');
		user: req.user
	})

	app.get('/addproducts', isLoggedIn, (req, res) => {
		res.render('adminadd_page');
		user: req.user
	})




	app.post('/addProduct', (req, res) => {

		let form = formidable.IncomingForm();
		form.keepExtensions = true;
		const message = "";

		// Form parsing
		form.parse(req, (err, fields, files) => {
			if (err) {
				return res.send("Error in parsing form");
			}

			let pname = fields['pname'] || "";
			let pdescription = fields['pdescription'] || "";
			let pprice = fields["pprice"] || "";
			let pcategory = fields["pcategory"] || "";
			// files 
			let pimage_path = files.pimage.path;
			let pimage_db_path = path.join(__dirname, "public", "assets", "upload_img", files.thumbnail.name);

			let url_path = files.url.path;
			let url_db_path = path.join(__dirname, "public", "assets", "upload_img", files.url.name);


			// server side validation. 
			if (!pname && !pdescription && !pprice && !pimage_path && !url_path) {
				return res.send("Please fill up the book add form correctly.");
			}

			// rename thumbnailPath
			fs.rename(pimage_path, pimage_db_path, function (err) {
				if (err) {
					console.log(err);
					return res.send("File uploading error thumbnail");
				}





			});

			fs.rename(url_path, url_db_path, function (err) {
				if (err) {
					return res.send("File uploading error doc");

				}


			});

			// Insert into db by validating data.
			console.log(thumbnail_db_path, url_db_path);
			thumbnail_db_path = path.join('/public', "assets", "upload_img", files.thumbnail.name).replace(/\\/g, '/');
			url_db_path = path.join('/public', "assets", "upload_img", files.url.name).replace(/\\/g, '/');
			tdb = path.join('/public', 'assets', 'upload_img', files.thumbnail.name);
			udb = path.join('/public', 'assets', 'upload_img', files.url.name);

			// thumbnail  db path
			tdb = tdb.replace(/\\/g, '/')
			// file db path

			udb = udb.replace(/\\/g, '/');

			console.log(tdb, udb);

			let columns = [
				pname,
				pdescription,
				pprice,
				pcategory,
				tdb,
				udb,
			]

			let insertBookSql = "insert into book( pnname, pdescription, pprice, pcategory, pimage,url) values (?)     ";

			con.query(insertBookSql, [columns], function (err, result) {
				if (!err) {
					return res.send("Book Added successfully");
				} else {
					console.log(err);
				}
			});
			if (err) {
				console.log("Error parsing the files");
				return res.status(400).json({
					status: "Fail",
					message: "There was an error parsing the files",
					error: err,
				});


			}
		});


	})













	app.get('/logout', function (req, res) {

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