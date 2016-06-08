var express = require('express');
var router = express.Router();

/* GET foundation page. */
router.get('/', function (req, res, next) {
  res.render('foundation', {title: 'Foundation Builder'});
});

module.exports = router;