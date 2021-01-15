const http = require("http");
const fs = require("fs");
  
http.createServer(function(request, response){
      
    console.log(`Запрошенный адрес: ${request.url}`);
    let filePath;
    if(request.url !== '/') {
        filePath = './dist/' + request.url.substr(1);
    } else {
        filePath = request.url.substr(1);
    }
    fs.access(filePath, fs.constants.R_OK, err => {
        if(err){
            response.statusCode = 404;
            response.end("Resourse not found!");
        }
        else{
            fs.createReadStream(filePath).pipe(response);
        }
      });
}).listen(8080, function(){
    console.log("Server started at 8080");
});