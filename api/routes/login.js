var express = require('express');
var async = require('async');
var jwt = require('jsonwebtoken');
var db = require('../db');
var config = require('../config');

var router = express.Router();

var app = express();

app.set('secretKey', config.secret);


router.post('/', function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    db.pool.query('SELECT * FROM users WHERE email=? AND password=? LIMIT 1;',
        [email, password], (err, results, fields) => {
        if (err) {
          res.status(500).json({"error": err});
        } else {
          let user = results.length ? results[0] : false;
          if (user) {
            let payload = {
                email: user.email
            }
            let token = jwt.sign(payload, app.get('secretKey'), {expiresIn: '24h'});
            res.json({success: true,  user: user, token: token});
          } else {
            res.json({"error": "NotExist"})
          }
        }
    });
});


module.exports = router;