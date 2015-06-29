/*jshint node:true */
(function () {
    'use strict';

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;

    var WorkTimeItemSchema = new Schema({
        ref: String,
        task: String,
        from: {type: Date, required: true},
        to: {type: Date, required: true},
        comment: {type: String},
        user: {
            type: String
            // ref: "User"
        }
    });

    mongoose.model('WorkTimeItem', WorkTimeItemSchema);
}());