var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(__dirname));

var dates = [];

//get: 
app.get('/date/1', function(req, res){
	console.log("date has been requested")
	res.send(JSON.stringify({value: date}));
});

//put
app.put('/date/1', function(req, res){
	console.log(req.body);
	date = req.body.value;
	res.end(JSON.stringify({}));
});

app.listen(3000, function(){
	console.log("server started");
});