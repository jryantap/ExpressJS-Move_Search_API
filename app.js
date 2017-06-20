//initialize frameworks
var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.render("search");
});

//parse JSON from api and store them in a var data 
app.get("/results", function(req, res){
    //get data from the query string from form
    var query = req.query.search;
    var url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body)
            res.render("results", {data: data});
        }
    })
    
});

//start server for heroku
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
