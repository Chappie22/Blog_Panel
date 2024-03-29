var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var cors = require('cors');
const bodyParser = require('body-parser');
var swaggerUi = require("swagger-ui-express");
var swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
          "This is a Kyrylo`s CRUD API application made with Express and documented with Swagger",
      contact: {
        name: "Kyrylo Kryklyvyi",
        url: "",
        email: "",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
    components: {
      securitySchemes: {
        jwt: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT"
        },
      }
    }
    ,
    security: [{
      jwt: []
    }],
  },
  apis: ["./routes/index.js"]
};

var app = express();

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(cors());
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const mongoose = require("mongoose");
mongoose.set('bufferCommands', false);
mongoose.connect("mongodb+srv://User:Password@cluster0.f0eee.mongodb.net/Blogs?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true }, function(err){
  if(err) return console.log(err);
  app.listen(3001, function(){
    console.log("Сервер ожидает подключения...");
  });
});
