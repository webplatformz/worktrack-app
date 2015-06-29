/*jshint node:true */
(function () {
    'use strict';
    var restify = require('restify'),
        server = restify.createServer();

    function respond(req, res) {
        res.send('hello ' + req.params.name);
    }

    server.get('/hello/:name', respond);
    server.head('/hello/:name', respond);

    // server.post("/worktimeitems", controllers.worktimeitem.createWorkTimeItem)

    server.listen(8080, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log('%s listening at %s', server.name, server.url);
        }
    });
}());
