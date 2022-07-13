/*const http = require("http");
const fs = require("fs");
var requests = require('requests');

const homeFile = fs.readFileSync("home.html","utf-8")  //utf-8 encoding because we dont want buffer data

const replaceVal = (tempVal, orgVal) => {
    let temparature = tempVal.replace("{%tempval%}", orgVal.main.temp);

    temparature = temparature.replace("{%tempmin%}", orgVal.main.temp_min);
    temparature = temparature.replace("{%tempmax%}", orgVal.main.temp_max);
    temparature = temparature.replace("{%location%}", orgVal.name);
    temparature = temparature.replace("{%country%}", orgVal.sys.country);

    return temparature; 
}




const server = http.createServer((req,res) =>  {

    if(req.url == "/" )
    {
        requests('https://api.openweathermap.org/data/2.5/weather?q=bhopal&appid=3095e3980eed6ab2ee18df31c04a5086')
.on('data',  (chunk) => {
    const objdata = JSON.parse(chunk);
    const arrData = [objdata];
    //console.log(arrData[0].main.temp);
    const realTimeData = arrData.map(val) => replaceVal(homeFile,val));
    
    console.log(realTimeData);
   // res.write(realTimeData);
})
.on('end',  (err) => {
  if (err) return console.log('connection closed due to errors', err);

  res.end()
});      
    }
} );

server.listen(8000, "127.0.0.1");

*/
//require('dotenv').config();
const http = require("http");
const fs = require("fs");
var requests = require("requests");


const homeFile = fs.readFileSync("Home.html", "utf-8");


const replaceVal = (tempVal, orgVal) => {
  let temperature = tempVal.replace("{%tempval%}", (orgVal.main.temp-273.15).toFixed(2));
  temperature = temperature.replace("{%tempmin%}", (orgVal.main.temp_min-273.15).toFixed(2));
  temperature = temperature.replace("{%tempmax%}", (orgVal.main.temp_max - 273.15).toFixed(2));
  temperature = temperature.replace("{%location%}", orgVal.name);
  temperature = temperature.replace("{%country%}", orgVal.sys.country);
  temperature = temperature.replace("{%tempstatus%}", orgVal.weather[0].main);

  return temperature;
};

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    requests(
      `https://api.openweathermap.org/data/2.5/weather?q=bhopal&appid=3095e3980eed6ab2ee18df31c04a5086`
    )
      .on("data", (chunk) => {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
        // console.log(arrData[0].main.temp);
        const realTimeData = arrData
          .map((val) => replaceVal(homeFile, val))
          .join("");
        res.write(realTimeData);
        // console.log(realTimeData);
      })
      .on("end", (err) => {
        if (err) return console.log("connection closed due to errors", err);
        res.end();
      });
  } else {
    res.end("File not found");
  }
});

server.listen(8000, "127.0.0.1");