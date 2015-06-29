/*jshint node:true */
(function () {
    'use strict';

    var mongoose = require('mongoose'),
        WorkTimeItemModel = require("./../models/workTimeItemModel.js"),
        WorkTimeItem = mongoose.model("WorkTimeItem");

    exports.getWorkTimeItem =  function (req, res) {
        //res.send('worktime-item ' + req.params.id + ' requested');
        var workTimeItem = new WorkTimeItem();
        res.send(workTimeItem);
    };

    exports.createWorkTimeItem = function (req, res) {
        /*var workTimeItemModel = new WorkTimeItem(req.body);
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
        });*/
        res.status(500);
    };
}());
