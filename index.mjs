
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { runQuery } from './db.mjs';

const port = 9000
const host = '127.0.0.1'

const server = createServer(async (req, res) => {
    
    console.log("Request", req.url)

     // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow the specified methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow the specified headers

    // Check if it's a pre-flight request
    if (req.method === 'OPTIONS') {
        // Respond to pre-flight request
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url == "/gpt") {

        res.writeHead(200, { 'Content-Type': 'application/json' });
        const fileData = createReadStream('data.json', 'utf-8')

        fileData.on('error', (error) => {
            console.error("error reading File", error)
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end("Error reading data file")
        })

        fileData.on('data', (chunk => {
            res.write(chunk)
        }))

        fileData.on('end', (chunk => {
            res.end()
        }))
    } else if (req.url == "/sample") {
      const query = "select * from Records limit 100";
      runQuery(query)
        .then((value) => {
            console.log("Value Here", value);
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(value));
        })
        .catch((rsn) => {
          console.log("reason", rsn);
          res.writeHead(500, {'Content-Type': 'text/plain'})
          res.end("Error In Running Query")
        })
    }

});

// Starts a simple http server locally on port 3000;
server.listen(port, host, () => {
    console.log("Port", port, "Host", host)
})


