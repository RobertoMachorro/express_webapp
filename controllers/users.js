const express = require('express')
const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource')
})

router.get('/list', function(req, res, next) {
	req.app.models.User.findAll().then(users => {
		res.send(users)
	})
})

module.exports = router
