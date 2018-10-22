const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const invalidNumberMessage = 'must be valid integer'

router.get('/', function(req, res, next) {
	res.send({operations: ['add']})
})

router.get('/add/:n1/:n2', [
	check('n1', invalidNumberMessage).isInt(),
	check('n2', invalidNumberMessage).isInt()
], function(req, res, next) {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(422).json({
			errors: errors.array()
		})
	}

	const n1 = Number(req.params.n1)
	const n2 = Number(req.params.n2)
	res.send({
		operands: [n1, n2],
		operator: '+',
		result: n1 + n2
	})
})

router.get('/multiply/:n1/:n2', [
	check('n1', invalidNumberMessage).isInt(),
	check('n2', invalidNumberMessage).isInt()
], function(req, res, next) {
	try {
		validationResult(req).throw()

		const n1 = Number(req.params.n1)
		const n2 = Number(req.params.n2)
		res.send({
			operands: [n1, n2],
			operator: '*',
			result: n1 * n2
		})
	} catch (error) {
		var errors = { errors: error.array() }
		console.error(req.url, errors)
		res.status(422).json(errors)
	}
})

module.exports = router
