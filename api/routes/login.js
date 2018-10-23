var express = require('express');
var db = require('../db');
var async = require('async');
var router = express.Router();

/*
router.get('/', function(req, res, next) {
    if (req.session.user_id) {
        res.json({"result": "success", "user_id": req.session.user_id});
    } else {
        res.json({"result": "expire", "user_id": null})
    }
});
*/

router.post('/', function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    db.pool.query('SELECT id FROM users WHERE email=? AND password=? LIMIT 1;',
        [email, password], (err, results, fields) => {
        if (err) {
          res.status(500).json({"error": err});
        } else {
          let userId = results.length ? results[0].id : false;
          if (userId) {
            res.json({"user_id": userId});
          } else {
            res.json({"error": "NotExist"})
          }
        }
    });
});


module.exports = router;