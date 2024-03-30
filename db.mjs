import mysql from 'mysql'

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Airtable-maps@11@23',
    database: 'airtable-maps'
})

connection.connect(function(err) {
  if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
  }
  console.log('Connected to database as ID ' + connection.threadId);
});

export async function runQuery(query) {

  return new Promise((resolve, reject) => {

      connection.query(query, function (err1, result) {
        if (err1) return reject(err1.sqlMessage);
        const data = result.map((row) => {
          return { ...row };
        });
        return resolve(data);
      });

  });
}