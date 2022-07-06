import { Client } from "pg";
import { config } from "dotenv";
import express, { Router } from "express";
import cors from "cors";
import findShortestRoute from "./utils/findShortestRoute"
config(); 

const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();

app.use(express.json()); 
app.use(cors()) 

const client = new Client(dbConfig);
client.connect();



app.get("/allstations", async (req, res) => {
  const dbres = await client.query('SELECT from_tiploc FROM tracks UNION SELECT to_tiploc FROM tracks');
  res.json(dbres.rows.map(rows=>rows.from_tiploc));
});

app.get("/shortestroute/:from/:to", async (req, res) => {
  const [fromStation, toStation] = [req.params.from, req.params.to];
  const dbres = await client.query('SELECT from_tiploc, to_tiploc, distance FROM tracks');
  const filteredData = dbres.rows.filter(row=>row.distance===0)
  findShortestRoute(dbres.rows,filteredData,fromStation, toStation)
  res.json(dbres.rows);
});

//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
