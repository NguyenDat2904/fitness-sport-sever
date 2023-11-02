var express = require('express');
var router = express.Router();
const BlogController = require('../controller/blog.controller');

router.get('/', BlogController.getAll);

module.exports = router;
