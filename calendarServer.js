var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(__dirname));

var dates = [];

//get: fetch from the Day_model, return the JSON object that packs up the value property from the dates array on the server

//request data from resource
app.get('/dates/:id', function(req, res){
	var id = req.params.id;
	console.log("get" + id);
	res.send(JSON.stringify({value: dates[id]}));
});

//put: used when we modify the Day_model
//Uploads a representation of the specified URI
app.put('/dates/:id', function(req, res){
	console.log('put');
	var id = req.params.id;
	dates[id] = req.body.value;
	res.end(JSON.stringify({id:id}));

});

//get: used to initialize the data for the Day_collection, and pack up the array of objects to feed into the collection and send it
app.get('/dates', function(req, res){
	console.log('sending collection');
	var dates_and_ids = dates.map(function(v, i){
		return {id : i, value : v};
	});
	res.send(dates_and_ids);
});


app.listen(3000, function(){
	console.log("server started");
});