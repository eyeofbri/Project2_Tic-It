var path = require("path");
var db = require("../models");

module.exports = function(app){
	app.get("/", function(req, res){
		res.render("home");
	});

	app.get("/login", function(req, res){
		res.render("login");
	});

	app.get("/signup", function(req, res){
		res.render("signup");
	});

	app.post("/login", function(req, res){
	    console.log(req.body);
	    db.User.findOne({where:{userEmail:req.body.email}}).then(function(dbUser){
	      console.log(dbUser);
				if (dbUser === null) {
					res.render("login")
				}
				else {
					if(dbUser.userPassword === req.body.password) {
						res.render("task")
					} else {
						res.render("login")
					}
				}
	    });
  	});

		app.post("/signup", function(req, res){
		    console.log(req.body);
		    db.User.create({
					userName:req.body.name,
					userEmail:req.body.email,
					userPassword:req.body.password
				}).then(function(dbUser){
		      console.log(dbUser);
				res.render("task")
		    });
	  	});



};
