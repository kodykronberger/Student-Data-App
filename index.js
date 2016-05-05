var http = require("http");
var studentService = require("./lib/students");
var responder = require("./lib/responseGenerator");
var staticFile = responder.staticFile("/public");

http.createServer(function (req, res) {
    // Parsed URL, in case of params
    var _url;

    // ...in case client uses any lower-case characters
    req.method = req.method.toUpperCase();
    console.log(req.method + " " + req.url);

    if (req.method !== "GET") {
        res.writeHead(501, {
            "Content-Type": "text/plain"
        });
        return res.end(req.method + " is not implemented by this server..");
    }

    if (_url = /^\/students$/i.exec(req.url)) {
        studentService.getStudents(function (error, data) {
            if (error) {
                return responder.send500(error, res);
            }
            return responder.sendJSON(data, res);
        });
    } else if (_url = /^\/students\/(\d+)$/i.exec(req.url)) {
        studentService.getStudent(_url[1], function (error, data) {
            if (error) {
                return responder.send500(error, res);
            }
            if (!data) {
                return responder.send404(res);
            }
            return responder.sendJSON(data, res);
        });
    } else {
        staticFile(req.url, res);
    }
}).listen(1337, "127.0.0.1");

console.log("Server is runnning! (http://127.0.0.1:1337)");