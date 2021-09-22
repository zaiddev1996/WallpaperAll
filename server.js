var express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	Task = require('./api/models/wallpaperAppModel'), //created model loading here
	bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/wallpaperdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// app.use(function (req, res) {
//   res.status(404).send({ url: req.originalUrl + " not found" });
// });

var routes = require('./api/routes/wallpaperAppRoutes'); //importing route
routes(app); //register the route

// app.listen(port);
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
