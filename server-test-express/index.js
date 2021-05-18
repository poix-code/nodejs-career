const express = require('express')
const morgan = require('morgan')

const app = express();

const port = 3000;

//Settings
app.set('appName', 'Express-server');
app.set('views', __dirname + '/views');
app.set('viewEngine', 'ejs');

//Middlewares
app.use(morgan('combined'));

app.use( (req, res, next) => {
  console.log("Next middleware");
  next();
});

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/login', (req, res) => {
  res.send("Login here!");
});

app.get('*', (req, res) => {
  res.send("Route not found");
});

app.listen(port, () => {
  console.log(`Server running on Port: ${port}`)
  console.log(`App name: ${app.get('appName')}`);
});