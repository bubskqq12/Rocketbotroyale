const express = require("express");
const https = require("https");
const app = express();

// Proxy request to chess.com but don't show content
app.get("/chess/*", (req, res, next) => {
  const pathSegments = req.path.split('/');
  const discordPath = pathSegments[2];
  
  https.request(new URL("https://chess.com/" + discordPath), (resp) => {
    // We can pipe the response if needed, but we don't show it to the user
    // res.contentType(resp.headers["content-type"]);
    // resp.pipe(res);
    
    // Instead, send a blank page
    res.send("<html><body></body></html>");
  }).end();
});

// Proxy request to rocketbotroyale2.winterpixel.io but don't show content
app.get("/*", (req, res, next) => {
  https.request(new URL("https://rocketbotroyale2.winterpixel.io/" + req.path), (resp) => {
    // We can pipe the response if needed, but we don't show it to the user
    // res.contentType(resp.headers["content-type"]);
    // resp.pipe(res);
    
    // Instead, send a blank page
    res.send("<html><body></body></html>");
  }).end();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
