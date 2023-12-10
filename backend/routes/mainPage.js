const router = require('express').Router();
const mysql = require("mysql")
const async = require('async');


const icreateConnection = (userId) => {
  return(
    mysql.createConnection({
      host: "database-1.cur9f5tr5hr1.us-east-2.rds.amazonaws.com",
      user: "admin",
      password:"preHoch99!",
      database:"prison_project"
  })
  )
}



function removeEmptyString(obj) {
  for(const key in obj){
    if(obj.hasOwnProperty(key) && obj[key] === ""){
      delete obj[key];
    }
  }
  return obj;
}

router.route('/:tableName').get((req, res) => {
    const db = icreateConnection(req.session.userId)
    const tableName = req.params.tableName;
    const queries = [
        'SELECT COUNT(*) AS totalPoliceOfficers FROM Police_Officer',
        'SELECT COUNT(*) AS totalCriminals FROM Criminal',
        'SELECT COUNT(*) AS totalPrecincts FROM Precinct',
        `SELECT * FROM ${tableName}`
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
  const db = icreateConnection(req.session.userId)
  const { criminalData, criminalIdData } = req.body;

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (!criminalData.Criminal_ID || !criminalIdData.Criminal_ID) {
      console.error('Invalid Input');
      res.status(500).json({ error: 'Can not add empty criminal id' });
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
  const db = icreateConnection(req.session.userId)
  const { policeOfficerData } = req.body;
  // Start a transaction
  console.log(policeOfficerData)
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (!policeOfficerData.Badge_num) {
      console.error('Invalid Input');
      res.status(500).json({ error: 'Can not add empty badgeNum' });
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
    const procedureSql = "CALL updatePoliceCount(?);";
    const procedureValues = [policeOfficerData.Precinct_ID]

    db.query(policeOfficerSql, policeOfficerValues, (policeOfficerErr, policeOfficerResults) => {
      if (policeOfficerErr) {
        return db.rollback(() => {
          console.error('Error adding police officer:', policeOfficerErr.message);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      }

    db.query(procedureSql, procedureValues, (policeOfficerErr, policeOfficerResults) => {
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
});

// Delete Police Officer
router.route('/deletePoliceOfficer/:badgeNum').delete((req, res) => {
  const db = icreateConnection(req.session.userId)
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

    const deleteArrestingOfficerSql = 'DELETE FROM Arresting_Officers WHERE Badge_Num = ?';

    const selectSql = 'SELECT Precinct_ID FROM Police_Officer WHERE Badge_num LIKE ?;';

    db.query(selectSql, [badgeNum], (selectErr, selectResults) => {
      if (selectErr) {
        return db.rollback(() => {
          console.error('Error deleting police officer:', selectErr.message);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      }
      console.log(selectResults);

    db.query(deleteArrestingOfficerSql, [badgeNum], (deleteArrestingOfficerErr, deleteArrestingOfficerResults) => {
      if (deleteArrestingOfficerErr) {
        return db.rollback(() => {
          console.error('Error deleting police officer:', deleteArrestingOfficerErr.message);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      }

    db.query(deletePoliceOfficerSql, [badgeNum], (deletePoliceOfficerErr, deletePoliceOfficerResults) => {
      if (deletePoliceOfficerErr) {
        return db.rollback(() => {
          console.error('Error deleting police officer:', deletePoliceOfficerErr.message);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      }
    const procedureSql = "CALL updatePoliceCount(?);";
    const procedureValues = [selectResults[0].Precinct_ID];
    console.log(procedureValues);

    db.query(procedureSql, procedureValues, (policeOfficerErr, policeOfficerResults) => {
      if (policeOfficerErr) {
        return db.rollback(() => {
          console.error('Error adding police officer:', policeOfficerErr.message);
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
    });
  });
});

// Delete Criminal
router.route('/deleteCriminal/:criminalId').delete((req, res) => {
    const db = icreateConnection(req.session.userId)
    const criminalId = req.params.criminalId;

    // Start a transaction
    db.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      const deleteSentencingSql = 'DELETE FROM Sentencing WHERE Criminal_ID = ?';

      db.query(deleteSentencingSql, [criminalId], (deleteSentencingErr, deleteSentencingResults) => {
        if (deleteSentencingErr) {
          return db.rollback(() => {
            console.error('Error deleting criminal:', deleteSentencingErr.message);
            res.status(500).json({ error: 'Internal Server Error' });
          });
        }

      const deleteCauseSql = 'DELETE FROM Cause WHERE Criminal_ID = ?';

      db.query(deleteCauseSql, [criminalId], (deleteCauseErr, deleteCauseResults) => {
        if (deleteCauseErr) {
          return db.rollback(() => {
            console.error('Error deleting criminal:', deleteCauseErr.message);
            res.status(500).json({ error: 'Internal Server Error' });
          });
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
    })
    });
  });

  router.route('/update_police_officer/:badgeNum').put((req, res) => {
    const db = icreateConnection(req.session.userId);
    const badgeNum = req.params.badgeNum;
    const { updatedPoliceOfficerData } = req.body;
    const processedData = removeEmptyString(updatedPoliceOfficerData);
    if (!updatedPoliceOfficerData || Object.keys(updatedPoliceOfficerData).length === 0) {
      return res.status(400).json({ error: 'No fields provided for update' });
    }

    // Start a transaction
    db.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }


      // Construct dynamic update SQL statement
      const updateFields = Object.keys(processedData);
      const updateValues = updateFields.map((field) => `${field} = ?`).join(', ');
      const updatePoliceOfficerSql = `UPDATE Police_Officer SET ${updateValues} WHERE Badge_num = ?`;

      // Prepare values for the update statement
      const updatePoliceOfficerValues = updateFields.map((field) => updatedPoliceOfficerData[field]);
      updatePoliceOfficerValues.push(badgeNum);

      db.query(updatePoliceOfficerSql, updatePoliceOfficerValues, (updateErr, updateResults) => {
        if (updateErr) {
          return db.rollback(() => {
            console.error('Error updating police officer:', updateErr.message);
            res.status(500).json({ error: 'Internal Server Error' });
          });
        }

        // Commit the transaction if the update was successful
        db.commit((commitErr) => {
          if (commitErr) {
            return db.rollback(() => {
              console.error('Error committing transaction:', commitErr.message);
              res.status(500).json({ error: 'Internal Server Error' });
            });
          }

          console.log('Transaction committed successfully');
          res.status(200).json({ message: 'Police officer updated successfully' });
        });
      });
    });
  });

  router.route('/update_criminal/:criminalId').put((req, res) => {
    const db = icreateConnection(req.session.userId);
    const criminalId = req.params.criminalId;
    const { updatedCriminalData, updatedCriminalIdData } = req.body;
    const processedCriminalData = removeEmptyString(updatedCriminalData);
    const processedCriminalIdData = removeEmptyString(updatedCriminalIdData);
    if ((!updatedCriminalData || Object.keys(updatedCriminalData).length === 0) &&
        (!updatedCriminalIdData || Object.keys(updatedCriminalIdData).length === 0)) {
      return res.status(400).json({ error: 'No fields provided for update' });
    }

    // Start a transaction
    db.beginTransaction((err) => {
      if (err) {
        console.error('Error starting transaction:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      // Construct dynamic update SQL statements
      const updateCriminalFields = Object.keys(processedCriminalData);
      const updateCriminalValues = updateCriminalFields.map((field) => `${field} = ?`).join(', ');
      const updateCriminalSql = `UPDATE Criminal SET ${updateCriminalValues} WHERE Criminal_ID = ?`;
      console.log(updateCriminalSql)
      const updateCriminalIdFields = Object.keys(processedCriminalIdData);
      const updateCriminalIdValues = updateCriminalIdFields.map((field) => `${field} = ?`).join(', ');
      const updateCriminalIdSql = `UPDATE Criminal_ID_Table SET ${updateCriminalIdValues} WHERE Criminal_ID = ?`;
      console.log(updateCriminalIdSql)
      // Prepare values for the update statements
      const updateCriminalSqlValues = updateCriminalFields.map((field) => updatedCriminalData[field]);
      updateCriminalSqlValues.push(criminalId);

      const updateCriminalIdSqlValues = updateCriminalIdFields.map((field) => updatedCriminalIdData[field]);
      updateCriminalIdSqlValues.push(criminalId);

      // Execute the first update statement for Criminal table
      db.query(updateCriminalSql, updateCriminalSqlValues, (updateCriminalErr, updateCriminalResults) => {
        if (updateCriminalErr) {
          return db.rollback(() => {
            console.error('Error updating criminal:', updateCriminalErr.message);
            res.status(500).json({ error: 'Internal Server Error' });
          });
        }

        // Execute the second update statement for Criminal_ID_Table
        db.query(updateCriminalIdSql, updateCriminalIdSqlValues, (updateCriminalIdErr, updateCriminalIdResults) => {
          if (updateCriminalIdErr) {
            return db.rollback(() => {
              console.error('Error updating criminal ID:', updateCriminalIdErr.message);
              res.status(500).json({ error: 'Internal Server Error' });
            });
          }

          // Commit the transaction if both updates were successful
          db.commit((commitErr) => {
            if (commitErr) {
              return db.rollback(() => {
                console.error('Error committing transaction:', commitErr.message);
                res.status(500).json({ error: 'Internal Server Error' });
              });
            }

            console.log('Transaction committed successfully');
            res.status(200).json({ message: 'Criminal and Criminal ID updated successfully' });
          });
        });
      });
    });
  });

  router.route('/export').put(async (req, res) => {

  });

  router.route('/searchCriminal/:name').post((req, res) => {
    const name = req.params.name;
    const db = icreateConnection(req.session.userId);
    const searchQuery = "SELECT t.Phone_num, t.Name, t.Address, c.Criminal_ID, c.Violent_Offender_Status, c.Probation_Status, c.Aliases FROM Criminal_ID_Table t INNER JOIN Criminal c ON c.Criminal_ID = t.Criminal_ID WHERE t.Name LIKE ?";
    const searchValue = `%${name}%`;

    db.query(searchQuery, [searchValue], (searchErr, searchResults) => {
      if (searchErr) {
        console.error('Error searching criminals by name:', searchErr);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log(searchResults);
      res.json({ criminals: searchResults });
    });
  });

module.exports = router;