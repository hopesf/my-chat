const express = require('express');
const router = express.Router();

const User = require("../models/users");
const bcrypt = require('bcrypt');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.pug');
});

router.post('/kayit', (req, res) =>{
  const {kadi,sifre} = req.body;

  bcrypt.hash(sifre,10).then( (hash) =>{
    const x = new User({
      kadi,
      sifre:hash
    });
    x.save((err,data) =>{
      if(err)
        res.json({
          status: false,
          message: 'Kullanici Olusamadi'
        });
      res.json({
        status: false,
        message: 'Kullanici Basariyla Olustu'
      });
    });

  });
});

router.post('/giris', (req,res)=>{
  const {kadi,sifre} = req.body;

  User.findOne({kadi},(err,user) =>{

    if(err) {
      throw err;
    }

    if(!user) {
      res.json({
        status: false,
        message: 'Kullanici adi yanlis'
      });
    }

    else{
      bcrypt.compare(sifre,user.sifre).then((result) =>{
        if(!result) {
          res.json({
            status: false,
            message: 'Doğrulama başarısız,yanlış şifre.'
          });
        }else{
          res.json({
            status: false,
            message: 'Giris Basarili'
          });
        }
      });
    }
  });

});

module.exports = router;
