/*jshint node:true */
(function () {
    'use strict';
    var restify = require('restify'),
        fs = require("fs"),
        server = restify.createServer(),
        controllers = {},
        controllers_path = process.cwd() + '/controllers';

    fs.readdirSync(controllers_path).forEach(function (file) {
        if (file.indexOf('.js') !== -1) {
            controllers[file.split('.')[0]] = require(controllers_path + '/' + file);
        }
    });

    function respond(req, res) {
        res.send('hello ' + req.params.name);
    }

    server.use(restify.bodyParser({mapParams: false}));

    /*server.use(
        function crossOrigin(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            return next();
        }
    );*/

    //server.use(restify.CORS());
    server.use(restify.fullResponse());

    server.use(restify.CORS());

    server.opts(/.*/, function (req, res, next) {
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
        res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
        res.send(200);
        return next();
    });

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
