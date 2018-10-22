var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./controllers/index')
var usersRouter = require('./controllers/users')
var calcRouter = require('./controllers/calc')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// controllers
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/calc', calcRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500)
	res.render('error', {
		title: err.message,
		http: {
			code: err.status,
			message: err.message
		},
		stack: req.app.get('env') === 'development' ? err.stack : ''
	})
})

module.exports = app
