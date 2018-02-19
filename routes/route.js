const express = require('express');
const http = require('http');
const querystring = require('querystring');
const router = express.Router();
// const request = require('request');
const request = require('request');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

moment.locale();

var upload = multer({dest:'uploads/'});
var directory = './public/images';

http.post = require('http-post');


/*
	User API
*/

router.post('/auth/login', function(req, res) {
	console.log(req.body);
	var body = "";

	var options = {
	 	url: "http://localhost:5000/user/"+req.body.email+"/"+req.body.password,
	  	method: 'GET',
	  	json: true
	};

	request(options, function (error, response, body) {
		// console.log(response.statusCode);
		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);
			}else{
				res.status(500).json(error);
			}
		}
		
	});


});

router.get('/user/:id', function(req, res) {

	var options = {
	 	url: "http://localhost:5000/user/"+req.params.id,
	  	method: 'GET',
	  	json: true
	};

	request(options, function (error, response, body) {
		// console.log(body);
		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);
			}else{
				res.status(500).json(error);
			}
		}

	});

});

router.post('/user', function(req, res) {
	// console.log(req.body);
	
	// var data = querystring.stringify(req.body);
	var body = "";

	var options = {
	 	url: "http://localhost:5000/user",
	  	method: 'POST',
	 	body: req.body,
	  	json: true
	};

	request(options, function (error, response, body) {
		// console.log(response.status);
		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);
			}else{
				res.status(500).json(error);
			}
		}

		
	});

});

router.get('/messages/:id', function(req, res) {

	var options = {
	 	url: "http://localhost:5000/messages/"+req.params.id,
	  	method: 'GET',
	  	json: true
	};

	// console.log(req.params);

	request(options, function (error, response, body) {
		// console.log(body);
		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);
			}else{
				res.status(500).json(error);
			}
		}

	});

});

router.get('/message/:id', function(req, res) {

	var options = {
	 	url: "http://localhost:5000/message/"+req.params.id,
	  	method: 'GET',
	  	json: true
	};

	// console.log(req.params);

	request(options, function (error, response, body) {
		// console.log(body);
		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);
			}else{
				res.status(500).json(error);
			}
		}

	});

});

router.post('/user/message', function(req, res) {
	console.log(req.body);

	var options = {
	 	url: "http://localhost:5000/message",
	  	method: 'POST',
	 	body: req.body,
	  	json: true
	};

	request(options, function (error, response, body) {

		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);
			}else{
				res.status(500).json(error);
			}
		}

	});

});


/*
	Services API
*/

router.get('/services', function(req, res) {
	var options = {
	 	url: "http://localhost:5001/services",
	  	method: 'GET',
	  	json: true
	};

	request(options, function (error, response, body) {

		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);
			}else{
				res.status(500).json(error);
			}
		}

	});

});


router.post('/service', upload.any(), function(req, res) {
	// console.log(req.files);

	if (req.files) {
		req.files.forEach( function(file) {
			var filename = (new Date).valueOf()+'-'+file.originalname;
			fs.rename(file.path, 'public/images/'+filename, function(err){
				if(err) throw err;

				console.log('file uploaded...');
				// var newfile = fs.createReadStream('public/images/'+filename);
				// console.log(newfile);


				var formData = {
				  // Pass data via Streams
				  my_file: fs.createReadStream('public/images/'+filename)
				};

				formData.title = req.body.title;
				formData.description = req.body.description;
				formData.price = req.body.price;
				formData.userid = req.body.userid;

				console.log(formData);

				var options = {
				 	url: "http://localhost:5001/service",
				  	method: 'POST',
				 	formData: formData,
				 	json: true
				};

				request(options, function (error, response, body) {
					// console.log(response.statusCode);
					if (error) {
						res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
					}else{
						if (response.statusCode == 200) {
							res.status(200).json(body);
							fs.readdir(directory, (err, files) => {
								if (err) console.log(err);

							  	for (const file of files) {
							    	fs.unlink(path.join(directory, file), err => {
							      		if (err) console.log(err);
							    	});
							  	}
							});
						}else{
							res.status(500).json(error);
						}
					}

					
				});

			});
		});
	}

});

router.get('/service/:id', function(req, res) {

	var options = {
	 	url: "http://localhost:5001/service/"+req.params.id,
	  	method: 'GET',
	  	json: true
	};

	request(options, function (error, response, body) {
		// console.log(body);
		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);
			}else{
				res.status(500).json(error);
			}
		}

	});

});


router.get('/servicesByUser/:id', function(req, res) {

	var options = {
	 	url: "http://localhost:5001/servicesByUser/"+req.params.id,
	  	method: 'GET',
	  	json: true
	};

	request(options, function (error, response, body) {
		// console.log(body);
		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);
			}else{
				res.status(500).json(error);
			}
		}

	});

});


/*
	
*/






router.post('/changeStatus', function(req, res) {

	var options = {
	 	url: "http://localhost:5001/serviceStatus",
	  	method: 'POST',
	  	body: {id: req.body.id},
	  	json: true
	};

	request(options, function (error, response, body) {
		// console.log(body);
		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);
			}else{
				res.status(500).json(error);
			}
		}

	});

});

/*
	Order API
*/

router.post('/order', function(req, res) {
	// console.log(req.body);

	var options = {
	 	url: "http://localhost:5002/order",
	  	method: 'POST',
	 	body: req.body,
	  	json: true
	};

	request(options, function (error, response, body) {

		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);


				// var options = {
				//  	url: "http://localhost:5000/user",
				//   	method: 'POST',
				//  	body: req.body,
				//   	json: true
				// };

				// request(options, function (error, response, body) {

				// 	if (error) {
				// 		res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
				// 	}else{
				// 		if (response.statusCode == 200) {
				// 			res.status(200).json(body);
				// 		}else{
				// 			res.status(500).json(error);
				// 		}
				// 	}

				// });







			}else{
				res.status(500).json(error);
			}
		}

	});

});


router.get('/orders/:id', function(req, res) {

	var options = {
	 	url: "http://localhost:5002/orders/"+req.params.id,
	  	method: 'GET',
	  	json: true
	};

	request(options, function (error, response, body) {
		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);
			}else{
				res.status(500).json(error);
			}
		}

	});

});

router.get('/deleteOrder/:id/:idservice', function(req, res) {

	var options = {
	 	url: "http://localhost:5002/order/"+req.params.id+"/"+req.params.idservice,
	  	method: 'DELETE',
	  	json: true
	};

	request(options, function (error, response, body) {
		// console.log(body);
		if (error) {
			res.status(500).json({error: "Problemas de conexión. Intente mas tarde..."});
		}else{
			if (response.statusCode == 200) {
				res.status(200).json(body);
			}else{
				res.status(500).json(error);
			}
		}

	});

});

module.exports = router;