const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')

const indexRouter = require('./controllers/index')
const usersRouter = require('./controllers/users')
const calcRouter = require('./controllers/calc')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
	secret: 'expressive we bapp',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: app.get('env') === 'production' }
}))

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
