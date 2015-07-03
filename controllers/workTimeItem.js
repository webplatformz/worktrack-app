/*jshint node:true */
// http://code.tutsplus.com/tutorials/restful-api-design-with-nodejs-restify--cms-22637
(function () {
    'use strict';

    var mongoose = require('mongoose'),
        WorkTimeItemModel = require("./../models/workTimeItemModel.js"),
        WorkTimeItem = mongoose.model("WorkTimeItem"),
        ObjectId = mongoose.Types.ObjectId;

    exports.getWorkTimeItem =  function (req, res) {
        res.header("Access-Control-Allow-Credentials", "true");
        //res.header("Access-Control-Allow-Origin", "localhost"); //dsafadsf
        //res.header("Access-Control-Allow-Headers", "X-Requested-With");

        res.json({
            type: true,
            data: { note: 'note from server' }
        });

        /*WorkTimeItem.findById(new ObjectId(req.params.id), function (err, workTimeItem) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (workTimeItem) {
                    res.json({
                        type: true,
                        data: workTimeItem
                    });
                } else {
                    res.json({
                        type: false,
                        data: "WorkTimeItem with id " + req.params.id + " not found"
                    });
                }
            }
        });*/
    };

    exports.createWorkTimeItem = function (req, res) {
        var workTimeItemModel = new WorkTimeItem(req.body);
        workTimeItemModel.save(function (err, workTimeItem) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                res.json({
                    type: true,
                    data: workTimeItem
                });
            }
        });
    };

    exports.updateWorkTimeItem = function (req, res, next) {
        var updatedWorkTimeItemModel = new WorkTimeItem(req.body);
        WorkTimeItem.findByIdAndUpdate(new ObjectId(req.params.id), updatedWorkTimeItemModel, function (err, workTimeItem) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (workTimeItem) {
                    res.json({
                        type: true,
                        data: workTimeItem
                    });
                } else {
                    res.json({
                        type: false,
                        data: "WorkTimeItem with id " + req.params.id + " not found"
                    });
                }
            }
        });
    };

    exports.deleteWorkTimeItem = function (req, res, next) {
        WorkTimeItem.findByIdAndRemove(new ObjectId(req.params.id), function (err, workTimeItem) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                res.json({
                    type: true,
                    data: "WorkTimeItem with id " + req.params.id + " deleted successfully"
                });
            }
        });
    };
}());
