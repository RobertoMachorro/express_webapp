const models = require('../models')
const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource')
})

router.get('/list', function(req, res, next) {
	models.User.findAll().then(users => {
		console.log('Created on', models.sequelize.createstamp)
		res.json(users)
	})
})

module.exports = router
