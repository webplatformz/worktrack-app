/* jshint node: true */
'use strict';

var mongoose = require('mongoose');

var dbConnectionUrl = 'mongodb://localhost/jwt-prototype';
var db = mongoose.connect(dbConnectionUrl, function() {
	console.log('connected to ' + dbConnectionUrl);
});

var Account = db.model('Account', {
	login:        { type: String, required: true },
	passwordHash: { type: String, required: true, select: false } 
	// "select:false" avoids to return the passwordHash per default, call ".select('passwordHash')" if required
});

module.exports = Account;