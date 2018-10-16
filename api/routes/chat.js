var express = require('express');
var db = require('../db');
var async = require('async');
var router = express.Router();

/*index */
router.get('/', function(req, res, next) {
  db.pool.query('SELECT * FROM posts;', (err, results, fields)=>{
    if (err) {
      res.status(500).json({"error": err});
    } else {
      res.json({"posts": results});
    }
  });
});

/*detail */
router.get('/:id', function(req, res, next) {
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
router.post('/', function(req, res, next) {
  async.waterfall(
    [
      cb => {
        let text = req.body.text;
        let priority = req.body.priority || 0;
        let name = req.body.name;
        if (text.length == 0 || name.length == 0) {
          res.status(500).json({"error": "empty value"});
          cb(500);
        } else {
          cb(null, text, priority, name);
        }
      },
      (text, priority, name, cb) => {
        db.pool.query('INSERT INTO posts (text,priority,name) values (?,?,?)',
          [text, priority, name], (err, results, fields)=>{
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
router.put('/:id', function(req, res, next) {
  async.waterfall(
    [
      cb => {
        let text = req.body.text;
        let name = req.body.name;
        if (text.length == 0 || name.length ==0) {
          res.status(500).json({"error": "empty value"});
          cb(500);
        } else {
          cb(null, text, name);
        }
      },
      (text, name, cb) => {
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
              cb(null, text, name, id);
            } 
        });
      },
      (text, name, id, cb) => {
        let priority = req.body.priority;
        db.pool.query('UPDATE posts SET ? where id=?;',
          [
            {
              "text": text,
              "priority": priority,
              "name": name,
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
              },
            "results": results});
          cb(null);
        });
      }
    ]
  );
});

/*destroy */
router.delete("/:id", function(req, res, next) {
  db.pool.query("DELETE from posts where id=?;",
    [req.params.id], (err, results, fields) => {
      if (err) {
        res.status(500).json({"error": err});
      } else if (results.affectedRows == 0) {
        res.status(500).json({"error": "not found"});
      } else {
        res.json({"results": results});
      }
    }
  );
});

module.exports = router;
