const router = require('express').Router();
const mysql = require("mysql")
const async = require('async');
const db = mysql.createConnection({
    host: "database-1.cur9f5tr5hr1.us-east-2.rds.amazonaws.com",
    user:"admin",
    password:"preHoch99!",
    database:"prison_project"
})

router.route('/').get((req, res) => {
    const queries = [
        'SELECT COUNT(*) AS totalPoliceOfficers FROM Police_Officer',
        'SELECT COUNT(*) AS totalCriminals FROM Criminal',
        'SELECT COUNT(*) AS totalPrecincts FROM Precinct',
        'SELECT * FROM Crime'
    ];
    const results = {}
    const executeQuery = (query, callback) => {
        db.query(query, (queryErr, queryResults) => {
          if (queryErr) {
            callback(queryErr);
            return;
          }

          callback(null, queryResults);
        });
      };
      async.parallel(
        queries.map((query, index) => (callback) => {
          executeQuery(query, (err, result) => {
            if (err) {
              callback(err);
              return;
            }

            results[`query${index + 1}`] = result;
            callback();
          });
        }),
        (asyncErr) => {

          if (asyncErr) {
            console.error('Error executing MySQL queries:', asyncErr);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
          }
          console.log(results);
          res.json(results);
        }
      );
    })

module.exports = router;