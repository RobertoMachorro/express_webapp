const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.views = (req.session.views) ? req.session.views+1 : 1;
	res.render('index', {
		title: 'Express WebApp',
		sid: req.sessionID,
		views: req.session.views
	})
})

module.exports = router
