// allows us to use express module
var express = require('express');

// app is an express application-- this is how we'll access all of the functionality of the module
var app = express();

// set port number as 1337
var port = 1337;

// set up handlebars view engine 
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// look inside the img folder to find all image files for this application
app.use(express(__dirname + '/public'));
app.use(express.static('public/img'));

// get the route to the cat page and render the template for it
app.get('/cat', function(req, res){
	res.render('animal', { title: 'Cats!', imgURL: 'cat.png', imgWidth: '200', imgHeight: '200' });
});

// get the route to the dog page and render the template for it
app.get('/dog', function(req, res){
	res.render('animal', { title: 'Dogs!', imgURL: 'dog.jpeg', imgWidth: '200', imgHeight: '200' });
});

// 404 catch-all handler (middleware)
app.use(function(req, res){
	res.status(404);
	res.render('404', { title: 'Page not found!' });
});

// custom 500 page
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

// make the app listen on the port
app.listen(port, function(){
	console.log('Express started on http://localhost:' + port + '; press Ctrl+C to terminate.');
});




