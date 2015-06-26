var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(__dirname));

var dates = [];
// var events = [];

//get: fetch from the Day_model, return the JSON object that packs up the value property from the dates array on the server

//request data from resource
app.get('/dates/:id', function(req, res){
	var id = req.params.id;
	console.log("get dates");
	// console.log(dates);
	res.send(JSON.stringify({value: dates[id]}));
});

// app.get('/events/:id', function(req, res){
// 	var event_str = req.params.id;
// 	console.log("get events");
// 	res.send(JSON.stringify({event: events[event_str]}));
// })

//send data to the server
app.post('/dates', function(req, res){
	console.log('post' + dates);
	var date_value = req.params.id;
	dates[date_value] = req.body.value;
	// res.end(JSON.stringify({id:id}));
	// var date_value = req.body.date_value;
	// var event_value = req.body.event_value;
	// console.log(date_value);
});
//put: used when we modify the Day_model
//Uploads a representation of the specified URI
//replace current data from server
app.put('/dates/:id', function(req, res){
	console.log('put');
	var id = req.params.id;
	dates[id] = req.body.value;
	res.end(JSON.stringify({id:id}));

});

// app.put('/events/id', function(req, res){
// 	console.log('put events');
// 	var event_id = req.params.event_id;
// 	events[event_id] = req.body.value;
// 	res.end(JSON.stringify({event_id:event_id}));
// });

//get: used to initialize the data for the Day_collection, and pack up the array of objects to feed into the collection and send it
app.get('/dates', function(req, res){
	var dates_and_ids = dates.map(function(v, i){
		return {id : i, value : v};
	});
	res.send(dates_and_ids);
	// console.log('sending collection');
	// var data_collection = dates.map(function(v, i, e){
	// 	return {id : i, value : v, event : e};
	// });
	// console.log(data_collection);
	// res.send(data_collection);
});


app.listen(3000, function(){
	console.log("server started");
});