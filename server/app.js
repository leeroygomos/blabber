require("dotenv").config(); 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
const mongoose = require("mongoose");

var app = express();

mongoose.connect(
  process.env.MONGODB_URL 
);

// uncomment this to test db connection
//
// const studentSchema = new mongoose.Schema({
//   roll_no: Number,
//   name: String,
//   year: Number,
//   subjects: [String]
// });

// const Student = mongoose.model('Student', studentSchema);

// const stud = new Student({
//   roll_no: 1001,
//   name: 'Madison Hyde',
//   year: 3,
//   subjects: ['DBMS', 'OS', 'Graph Theory', 'Internet Programming']
// });
// stud
//   .save()
//   .then(
//       () => console.log("One entry added"), 
//       (err) => console.log(err)
//   );

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
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
