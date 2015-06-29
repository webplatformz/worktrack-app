/* jslint node: true */
'use strict';

var db = require('./db');

var WorkTimeItem = db.model('WorkTimeItem', {
	// _id, managed by mongodb
	ref: { type: String }, // TODO: check how to require task OR ref! Or if another domain object Tast is more adequate!
	task: { type: String },
	from: { type: Date, required: true },
	to: { type: Date, required: true },
	userId: { type: String }, // TODO: check how to ref User in mongo
	comment: { type: String }
});

module.exports = WorkTimeItem;