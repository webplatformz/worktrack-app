/* jslint node:true */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var Account = require('./account');

var portNr = 3002;
var jwtKey = 'my secret key which should not be stored here'; //TODO: fix this!

var app = express();
app.use(bodyParser.json());

// req with: http POST http://localhost:3002/session login=thomas password=geheim 
app.post('/session', function(req, res, next) {
	console.log('req POST to "session"');

	var login = req.body.login;
	var password = req.body.password;
	delete req.body.password; // ensure password will not be compromitted by accident

	Account.findOne( {login: login} )
		.select('passwordHash')
		.exec( function(err, account) {
			if (err) {
				return next(err);
			}
			validatePasswordForAccount(password, account, function(err, isValid) {
				if (err || !isValid) {
					if (err) { console.log(err); }
					res.status(401).send();
				} else {
					var token = jwt.encode(req.body, jwtKey);
					res.json(token);
				}
				console.log('... res: ' + res.statusMessage);
			});
	});

});

// req with: http GET http://localhost:3002/accounts x-jwt-token:<token received by POST call to '/session'>
app.get('/accounts', function(req, res, next) {
	console.log('req GET to "accounts"');

	var token = req.headers['x-jwt-token'];
	if (! token) {
		res.status(401).send( { msg: 'http header "x-jwt-token" is missing' } );
		console.log('... res: ' + res.statusMessage); 
		return;
	}

	var tokenPayload = jwt.decode(token, jwtKey);

	Account.findOne({ login: tokenPayload.login }, function(err, account) {
		if (err) {
			return next(err);
		}
		res.json(account);
		console.log('... res: ' + res.statusMessage); 
	});
});

// req with: http GET http://localhost:3002/accounts/<login> x-jwt-token:<token received by POST call to '/session'>
app.get('/accounts/:login', function(req, res, next) {
	console.log('req GET to "accounts/:login"');

	var login = req.params.login;
	console.log('requested login: ' + login);

	var token = req.headers['x-jwt-token'];
	if (! token) {
		res.status(401).send( { msg: 'http header "x-jwt-token" is missing' } );
		console.log('... res: ' + res.statusMessage); 
		return;
	}

	var tokenPayload = jwt.decode(token, jwtKey);
	console.log('provided token payload: ' + tokenPayload);

	if (! tokenPayload || (login !== tokenPayload.login)) {
		res.status(401).send( { msg: 'mismatch of x-jwt-token and requested login' } );
		console.log('... res: ' + res.statusMessage); 
		return;
	}

	Account.findOne({ login: tokenPayload.login }, function(err, account) {
		if (err) {
			return next(err);
		}
		res.json(account);
		console.log('... res: ' + res.statusMessage); 
	});
});

// req with: http POST http://localhost:3002/accounts login=thomas password=geheim
app.post('/accounts', function(req, res, next) {
	console.log('req POST to "accounts"');

	var login = req.body.login;
	var password = req.body.password;
	delete req.body.password; // ensure password will not be compromitted by accident

	var passwordHash = bcrypt.hashSync(password, 8);

	var account = new Account( { login: login, passwordHash: passwordHash } );
	console.log(account);

	account.save(function(err, account) {
		if (err) {
			return next(err);
		}
		var resAccount = { login: account.login }; // return only a reduced sight, TODO: check how to filter passwdHash on db side
		res.status(201).location('/accounts/' + account.login).json(resAccount);
		console.log('... res: ' + res.statusMessage); 	
	});

});

app.listen(portNr, function() {
	console.log('server started, listening on port ' + portNr + '; stop with Ctrl-C!');
});


function validatePasswordForAccount(password, account, callbackFunction) {
	if (! account) { 
		callbackFunction({ msg: 'failed to validate password for account, account is undefined' }, false); 
	} else 	if (! password) { 
		callbackFunction({ msg: 'failed to validate password for account, password is undefined' }, false); 
	} else {
		bcrypt.compare(password, account.passwordHash, callbackFunction);
	}
}
