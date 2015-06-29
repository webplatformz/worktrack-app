/*jshint node:true */
(function () {
    'use strict';
    var restify = require('restify'),
        fs = require("fs"),
        server = restify.createServer(),
        controllers = {},
        controllers_path = process.cwd() + '/controllers';

    fs.readdirSync(controllers_path).forEach(function (file) {
        if (file.indexOf('.js') != -1) {
            controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
        }
    });

    function respond(req, res) {
        res.send('hello ' + req.params.name);
    }

    server.get('/hello/:name', respond);
    server.head('/hello/:name', respond);

    server.post("/worktimeitems", controllers.workTimeItem.createWorkTimeItem);
    server.put("/worktimeitems/:id", controllers.workTimeItem.updateWorkTimeItem);
    server.del("/worktimeitems/:id", controllers.workTimeItem.deleteWorkTimeItem);
    server.get({path: "/worktimeitems/:id", version: "1.0.0"}, controllers.workTimeItem.getWorkTimeItem);

    server.listen(8080, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('%s listening at %s', server.name, server.url);
        }
    });
}());
