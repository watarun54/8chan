var express = require('express');
var async = require('async');
var db = require('../db');
var verifyToken = require('./verifyToken');
var router = express.Router();

/*index */
router.get('/', verifyToken, function(req, res, next) {
  db.pool.query('SELECT * FROM posts;', (err, results, fields)=>{
    if (err) {
      res.status(500).json({"error": err});
    } else {
      res.json({"posts": results});
    }
  });
});

/*detail */
router.get('/:id', verifyToken, function(req, res, next) {
  db.pool.query('SELECT * FROM posts where id=?;',
    [req.params.id], (err, results, fields)=>{
    if (err) {
      res.status(500).json({"error": err});
    } else if (results.length == 0) {
      res.status(500).json({"error": "not found"});
    } else {
      res.json({"posts": results});
    }
  });
});

/*create */
router.post('/', verifyToken, function(req, res, next) {
  async.waterfall(
    [
      cb => {
        let text = req.body.text;
        let priority = req.body.priority || 0;
        let name = req.body.name;
        let user_id = req.body.user_id || 1;
        if (text.length == 0 || name.length == 0) {
          res.status(500).json({"error": "empty value"});
          cb(500);
        } else {
          cb(null, text, priority, name, user_id);
        }
      },
      (text, priority, name, user_id, cb) => {
        db.pool.query('INSERT INTO posts (text,priority,name,user_id) values (?,?,?,?);',
          [text, priority, name, user_id], (err, results, fields)=>{
          if (err) {
            res.status(500).json({"error": err});
            cb(err);
          } else {
            res.json({
              "data":
                 {
                  "id": results.insertId,
                  "text": text,
                  "priority": priority,
                  "name": name,
                  "user_id": user_id
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

/*update */
router.put('/:id', verifyToken, function(req, res, next) {
  async.waterfall(
    [
      cb => {
        let text = req.body.text;
        let priority = req.body.priority || 0;
        let name = req.body.name;
        let user_id = req.body.user_id;
        if (text.length == 0 || name.length ==　0) {
          res.status(500).json({"error": "empty value"});
          cb(500);
        } else {
          cb(null, text, priority,  name, user_id);
        }
      },
      (text, priority, name, user_id, cb) => {
        let id = req.params.id;
        db.pool.query('SELECT * FROM posts where id=?;',
          [req.params.id], (err, results, fields)=>{
            if (err) {
              res.status(500).json({"error": err});
              cb(err);
            } else if (results.length==0) {
              res.status(500).json({"error": "This id is not found"});
              cb(500);
            }
            else{
              cb(null, text, priority, name, id, user_id);
            } 
        });
      },
      (text, priority, name, id, user_id, cb) => {
        db.pool.query('UPDATE posts SET ? where id=?;',
          [
            {
              "text": text,
              "priority": priority,
              "name": name,
              "user_id": user_id,
            },
            id
          ], (err, results, fields)=>{
          if (err) {
            res.status(500).json({"error": err});
            cb(err);
          }
          res.json({
            "data": 
              {
                "id": Number(id),
                "text": text,
                "priority": priority,
                "name": name,
                "user_id": user_id
              },
            "results": results});
          cb(null);
        });
      }
    ]
  );
});

/*destroy */
router.delete("/:id", verifyToken, function(req, res, next) {
  db.pool.query("DELETE from posts where id=?;",
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

/* destroy user's posts */
router.delete("/user/:id", verifyToken, function(req, res, next) {
  db.pool.query("DELETE from posts where user_id=?;",
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
