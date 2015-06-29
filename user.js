/* jslint node: true */
'use strict';

var db = require('./db');

var User = db.model('User', {
	name: { type: String, required: true }
});

module.exports = User;