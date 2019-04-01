const express = require('express');
const router = express.Router();

const User = require("../models/users");
const bcrypt = require('bcrypt');

const short = require('short-uuid');
const kisaid = short.generate();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index.pug');
});

router.post('/kayit', (req, res) =>{
  const {kadi,sifre} = req.body;

  User.findOne({ kadi: req.body.kadi }, function(err, user) {
    if (user) {

      res.json({
        status: false,
        message: 'Bu kullanici zaten kayitli'
      });

    }
    else{
      bcrypt.hash(sifre,10).then( (hash) =>{

        const kaydet = new User({
          kayitid:kisaid,
          kadi,
          sifre:hash
        });

        kaydet.save((err,data) =>{
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

        next();
      });
    }
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
