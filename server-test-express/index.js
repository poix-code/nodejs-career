const express = require('express')
const morgan = require('morgan')
const routes = require('./routes');

const app = express();

const port = 3000;

//Settings
app.set('appName', 'Express-server');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('combined'));

app.use( (req, res, next) => {
  console.log("Next middleware");
  next();
});

//Routes
app.use(routes);

app.listen(port, () => {
  console.log(`Server running on Port: ${port}`)
  console.log(`App name: ${app.get('appName')}`);
});