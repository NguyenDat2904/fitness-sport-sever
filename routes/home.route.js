var express = require('express');
var router = express.Router();

router.post('/get', (req, res) => {
    return res.json({ msg: 'Connect success' });
});

module.exports = router;
