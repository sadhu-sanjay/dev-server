import mysql from 'mysql'

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Airtable-maps@11@23',
    database: 'airtable-maps'
})


export async function runQuery(query) {

  return new Promise((resolve, reject) => {

    connection.connect(function (err) {
      if (err) return reject(err.code);

      connection.query(query, function (err1, result) {
        if (err1) return reject(err1.sqlMessage);

        const data = result.map((row) => {
          return { ...row }; 
        });
        return resolve(data);
      });
    });

  });
}