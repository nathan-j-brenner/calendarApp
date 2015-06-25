var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(__dirname));

var dates = [];

//get: 
app.get('/dates/1', function(req, res){
	console.log("date has been requested")
	res.send(JSON.stringify({value: dates}));
});

//put
app.put('/dates/1', function(req, res){
	console.log(req.body);
	dates = req.body.value;
	res.end(JSON.stringify({}));
});

app.listen(3000, function(){
	console.log("server started");
});