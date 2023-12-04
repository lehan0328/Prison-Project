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
          res.json(results);
        }
      );
    })

   // API endpoint to add a criminal and related information to two tables
router.route('/add_criminal').post((req, res) => {
  const { criminalData, criminalIdData } = req.body;

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

      // Insert into Criminal_ID_Table
      const idTableSql = 'INSERT INTO Criminal_ID_Table (Criminal_ID, Phone_num, Name, Address) VALUES (?, ?, ?, ?)';
      const idTableValues = [criminalIdData.Criminal_ID, criminalIdData.Phone_num, criminalIdData.Name, criminalIdData.Address];
      db.query(idTableSql, idTableValues, (idTableErr) => {
        if (idTableErr) {
          return db.rollback(() => {
            console.error('Error adding data to Criminal_ID_Table:', idTableErr.message);
            res.status(500).json({ error: 'Internal Server Error' });
          });
        }

    // Insert into Criminal table
    const criminalSql = 'INSERT INTO Criminal (Criminal_ID ,Violent_Offender_Status, Probation_Status, Aliases) VALUES (?, ?, ?, ?)';
    const criminalValues = [
      criminalData.Criminal_ID,
      criminalData.Violent_Offender_Status,
      criminalData.Probation_Status,
      JSON.stringify(criminalData.Aliases),
    ];

    db.query(criminalSql, criminalValues, (criminalErr, criminalResults) => {
      if (criminalErr) {
        return db.rollback(() => {
          console.error('Error adding criminal:', criminalErr.message);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      }

        // Commit the transaction if both inserts were successful
        db.commit((commitErr) => {
          if (commitErr) {
            return db.rollback(() => {
              console.error('Error committing transaction:', commitErr.message);
              res.status(500).json({ error: 'Internal Server Error' });
            });
          }

          console.log('Transaction committed successfully');
          res.status(201).json({ message: 'Data added successfully' });
        });
      });
    });
  });
});

router.route('/add_officer').post((req, res) => {
  const { policeOfficerData } = req.body;
  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Insert into Police_Officer table
    const policeOfficerSql = 'INSERT INTO Police_Officer (PO_Name, Badge_num, Precinct_ID, Phone, Status) VALUES (?, ?, ?, ?, ?)';
    const policeOfficerValues = [
      policeOfficerData.PO_Name,
      policeOfficerData.Badge_num,
      policeOfficerData.Precinct_ID,
      policeOfficerData.Phone,
      policeOfficerData.Status,
    ];

    db.query(policeOfficerSql, policeOfficerValues, (policeOfficerErr, policeOfficerResults) => {
      if (policeOfficerErr) {
        return db.rollback(() => {
          console.error('Error adding police officer:', policeOfficerErr.message);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      }

      // Commit the transaction if the insert was successful
      db.commit((commitErr) => {
        if (commitErr) {
          return db.rollback(() => {
            console.error('Error committing transaction:', commitErr.message);
            res.status(500).json({ error: 'Internal Server Error' });
          });
        }

        console.log('Transaction committed successfully');
        res.status(201).json({ message: 'Police officer added successfully' });
      });
    });
  });
});

// Delete Police Officer
router.route('/deletePoliceOfficer/:badgeNum').delete((req, res) => {
  const badgeNum = req.params.badgeNum;

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Delete from Police_Officer table
    const deletePoliceOfficerSql = 'DELETE FROM Police_Officer WHERE Badge_num = ?';

    db.query(deletePoliceOfficerSql, [badgeNum], (deletePoliceOfficerErr, deletePoliceOfficerResults) => {
      if (deletePoliceOfficerErr) {
        return db.rollback(() => {
          console.error('Error deleting police officer:', deletePoliceOfficerErr.message);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      }

      // Commit the transaction if the delete was successful
      db.commit((commitErr) => {
        if (commitErr) {
          return db.rollback(() => {
            console.error('Error committing transaction:', commitErr.message);
            res.status(500).json({ error: 'Internal Server Error' });
          });
        }

        console.log('Transaction committed successfully');
        res.status(200).json({ message: 'Police officer deleted successfully' });
      });
    });
  });
});

// Delete Criminal
router.route('/deleteCriminal/:criminalId').delete((req, res) => {
  const criminalId = req.params.criminalId;

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Delete from Criminal table
    const deleteCriminalSql = 'DELETE FROM Criminal WHERE Criminal_ID = ?';

    db.query(deleteCriminalSql, [criminalId], (deleteCriminalErr, deleteCriminalResults) => {
      if (deleteCriminalErr) {
        return db.rollback(() => {
          console.error('Error deleting criminal:', deleteCriminalErr.message);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      }

      // Commit the transaction if the delete was successful
      db.commit((commitErr) => {
        if (commitErr) {
          return db.rollback(() => {
            console.error('Error committing transaction:', commitErr.message);
            res.status(500).json({ error: 'Internal Server Error' });
          });
        }

        console.log('Transaction committed successfully');
        res.status(200).json({ message: 'Criminal deleted successfully' });
      });
    });
  });
});



module.exports = router;