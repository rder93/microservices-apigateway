var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var http = require('http');

var app = express();

const port = 3000;
const route = require('./routes/route');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/apigateway');
// mongoose.connection.on('connected',()=>{
// 	console.log('Connected to MongoDB at 27017');
// });

// mongoose.connection.on('error',(err)=>{
// 	if (err) {
// 		console.log('Error is: '+err)
// 	}
// });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(cors());
// app.use(function(req, res, next) {
//   	res.header("Access-Control-Allow-Origin", "*");
//   	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   	next();
// });


app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({extended: true}));

app.use('/api', route);
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res){
	// res.send({msg: 'Hola APIGateway aqui!'});
	res.render('index.html');
});

// app.get('/connect_server1', function(){
// 	http.get('http://localhost:3000/mensaje', (res) => {
// 		let body = "";
// 		// console.log('statusCode:', res.statusCode);
// 		// console.log('headers:', res.headers);

// 	  	res.on('data', (d) => {
// 	    	body += d;

// 	  	});

// 	  	res.on('end', () => {
// 	  		console.log(body);
// 	  	})

// 		}).on('error', (e) => {
// 	  		console.error(e);
// 	});
// });

app.listen(port, ()=>{
	console.log('APIGateway running at port: '+port);
});
