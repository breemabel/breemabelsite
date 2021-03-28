//Install express server
const express = require('express');
const path = require('path');
var proxy = require('express-http-proxy');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/ImBrenanAngular'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/ImBrenanAngular/'}
);
});

app.use('/api/events/', proxy('https://api.bizzabo.com'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
