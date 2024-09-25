const express = require("express");
const https = require("https");
const app = express();

// Proxy request to chess.com but don't show the actual link to the user
app.get("/chess/*", (req, res, next) => {
  const pathSegments = req.path.split('/');
  const discordPath = pathSegments[2];

  // Make a request to the external URL
  https.get("https://chess.com/" + discordPath, (externalRes) => {
    res.setHeader('Content-Type', externalRes.headers['content-type']);  // Set the content type based on the external response

    // Pipe the external response to the user but keep them on your server's URL
    externalRes.pipe(res);
  }).on('error', (err) => {
    console.error('Error fetching from chess.com:', err);
    res.status(500).send('Error fetching content');
  });
});

// Proxy request to rocketbotroyale2.winterpixel.io but don't show the actual link to the user
app.get("/*", (req, res, next) => {
  // Make a request to the external URL
  https.get("https://rocketbotroyale2.winterpixel.io/" + req.path, (externalRes) => {
    res.setHeader('Content-Type', externalRes.headers['content-type']);  // Set the content type based on the external response

    // Pipe the external response to the user but keep them on your server's URL
    externalRes.pipe(res);
  }).on('error', (err) => {
    console.error('Error fetching from rocketbotroyale2.winterpixel.io:', err);
    res.status(500).send('Error fetching content');
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
