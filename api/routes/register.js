var express = require('express');
var db = require('../db');
var async = require('async');
var router = express.Router();


router.get('/', function(req, res, next) {
    db.pool.query('SELECT * FROM users;', (err, results, fields) => {
        if (err) {
          res.status(500).json({"error": err});
        } else {
          res.json({"results": results});
        }
    });
});

router.post('/', function(req, res, next) {
    async.waterfall(
        [
          cb => {
            let email = req.body.email;
            let password = req.body.password;
            if (email.length === 0 || password.length === 0) {
              res.status(500).json({"error": "empty"});
              cb(500);
            } else {
              cb(null, email, password);
            }
          },
          (email, password, cb) => {
            db.pool.query('SELECT * FROM users WHERE email =? LIMIT 1;',
                [email], (err, results, fields) => {
                    if(err) {
                        res.status(500).json({"error": err});
                        cb(500);
                    } else if (results.length === 0) {
                        cb(null, email, password);
                    } else {
                        res.json({"error": "すでにユーザーが存在しています"});
                        cb(500);
                    }
                });
          },
          (email, password, cb) => {
            db.pool.query('INSERT INTO users (email,password) VALUES (?,?);',
                [email, password], (err, results, fields) => {
                    if (err) {
                        res.status(500).json({"error": err});
                        cb(err);
                    } else {
                        res.json({
                        "user":
                            {
                            "id": results.insertId,
                            "email": email,
                            "password": password,
                            },
                        "results": results
                        });
                        cb(null);
                    }
                });
          }
        ]
      );
});


module.exports = router;