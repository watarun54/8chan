var express = require('express');
var async = require('async');
var jwt = require('jsonwebtoken');
var db = require('../db');
var verifyToken = require('./verifyToken');
var config = require('../config');

var router = express.Router();

var app = express();

app.set('secretKey', config.secret);


// ログイン
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
            res.json({"error": "emailまたはpasswordが間違っています"})
          }
        }
    });
});

// ユーザー情報取得
router.get('/:id', verifyToken, function(req, res, next) {
    db.pool.query('SELECT * FROM users where id=?;',
      [req.params.id], (err, results, fields)=>{
      if (err) {
        res.status(500).json({"error": err});
      } else if (results.length == 0) {
        res.json({"error": "ユーザーが見つかりませんでした"});
      } else {
        res.json({"user": results[0]});
      }
    });
});

// ユーザー情報編集
router.put('/:id', verifyToken, function(req, res, next) {
    async.waterfall(
        [
          cb => {
            let email = req.body.email;
            let password = req.body.password;
            if (email.length == 0 || password.length == 0) {
              res.json({"error": "empty value"});
              cb(500);
            } else {
              cb(null, email, password);
            }
          },
          (email, password, cb) => {
            let id = req.params.id;
            db.pool.query('SELECT * FROM users where id=?;',
              [id], (err, results, fields)=>{
                if (err) {
                  res.status(500).json({"error": err});
                  cb(err);
                } else if (results.length==0) {
                  res.json({"error": "This id is not found"});
                  cb(500);
                }
                else{
                  cb(null, email, password, id);
                } 
            });
          },
          (email, password, id, cb) => {
            db.pool.query('UPDATE users SET ? where id=?;',
              [
                {
                  "email": email,
                  "password": password,
                },
                id
              ], (err, results, fields)=>{
              if (err) {
                res.status(500).json({"error": err});
                cb(err);
              }
              res.json({
                "user": 
                  {
                    "id": Number(id),
                    "email": email,
                    "password": password,
                  },
                "results": results});
              cb(null);
            });
          }
        ]
      );
});

// ユーザー削除
router.delete("/:id", verifyToken, function(req, res, next) {
    db.pool.query("DELETE from users where id=?;",
      [req.params.id], (err, results, fields) => {
        if (err) {
          res.status(500).json({"error": err});
        } else if (results.affectedRows == 0) {
          res.json({"error": "not found"});
        } else {
          res.json({"results": results});
        }
      }
    );
  });

module.exports = router;