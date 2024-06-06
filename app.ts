import express from 'express';
import * as http from 'http'
import cors from 'cors';


const app: express.Application = express();
app.use(cors());

const server: http.Server = http.createServer(app);

