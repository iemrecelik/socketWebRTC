const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/ac', (req, res) => {
	res.render('view');
});

module.exports = router;