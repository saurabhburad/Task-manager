const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
const path = require('path');
// ...
// For all GET requests, send back index.html
// so that PathLocationStrategy can be used


app.get('*', function (req, res) {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
  });
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);