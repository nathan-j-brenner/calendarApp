var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(__dirname));

var dates = [];

//request data from resource
app.get('/dates/:id', function(req, res){
	var id = req.params.id;
	console.log("get dates");
	res.send(JSON.stringify(dates[id]));
});

//send data to the server
app.post('/dates/', function(req, res){
	var id = dates.length;
	dates[id] = {id:id, day:req.body.day, event: req.body.event};
	console.log("posts", dates);
	res.send(JSON.stringify({id:id}));
});

//replace current data from server
app.put('/dates/:id', function(req, res){
	var day_object = {
		id: req.body.id,
		day: req.body.day,
		event: req.body.event
	};
	console.log('put' + dates);
	var id = req.params.id;
	dates[id] = day_object;
	console.log(day_object);
	res.end(JSON.stringify({id:id}));
});

//get: used to initialize the data for the Day_collection, and pack up the array of objects to feed into the collection and send it
app.get('/dates', function(req, res){
	res.send(dates);
});

app.listen(3000, function(){
	console.log("server started");
});