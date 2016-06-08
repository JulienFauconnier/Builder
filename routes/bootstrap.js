var express = require('express');
var router = express.Router();

/* GET bootstrap page. */
router.get('/', function (req, res, next) {
  res.render('bootstrap', {title: 'Bootstrap Builder'});
});

module.exports = router;
