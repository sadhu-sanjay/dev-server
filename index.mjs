import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { runQuery } from "./db.mjs";
import express from "express";

const port = 9000;
const host = "127.0.0.1";
const UsersRouter = require

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.send(200);
  }else {
    next();
  }
})

app.get("/gpt", async (req, res) => {
  const fileData = createReadStream("data.json", "utf-8");

  fileData.on("error", (error) => {
    console.error("error reading File", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error reading data file");
  });

  fileData.on("data", (chunk) => {
    res.write(chunk);
  });

  fileData.on("end", (chunk) => {
    res.end();
  });
})

app.get("/sample", async (req, res) => {
  const query = "select * from Records limit 100";
  runQuery(query)
    .then((value) => {
      console.log("Value Here", value);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(value));
    })
    .catch((rsn) => {
      console.log("reason", rsn);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error In Running Query");
    });
})


// Starts a simple http server locally on port 3000;

server.listen(port, host, () => {
  console.log("Port", port, "Host", host);
})
