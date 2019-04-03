const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('chat.pug',{user: req.user});
});

module.exports = router;
