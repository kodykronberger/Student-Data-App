var fs = require("fs");

exports.send404 = function(response) {
    console.error("Resource not found.");
    response.writeHead(404, {
        "Content-Type": "text/plain"
    });
    
    response.end("Not found (404)");
}

exports.sendJSON = function(data, response) {
    response.writeHead(200, {
        "Content-Type": "application/json"
    });
    
    response.end(JSON.stringify(data));
}

exports.send500 = function(){
    console.error(data.red);
    response.writeHead(500, {
        "Content-Type": "text/plain"
    });
    response.end(data);
}

exports.staticFile = function(staticPath){
    return function(data, response){
        var readStream;
        data = data.replace(/^(\/index)(.html)?$/i, "$1.html");
        data = "." + staticPath + data;
        
        fs.stat(data, function(error, stats){
            if(error || stats.isDirectory()){
                return exports.send404(response);
            }
        });
        
        readStream = fs.createReadStream(data);
        
        return readStream.pipe(response);
    }
}