import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import database from "./database.js";

const app = express();

app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000', // Permite solicitudes solo desde tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
  credentials: true
}));

// Agrega un middleware para manejar las solicitudes de pre-vuelo (OPTIONS)
app.options('*', cors());


app.get("/", (req, res) => {
    res.status(200).json(database);
  });

app.put("/add", (req, res) => {
    database.push({
      id: database[database.length - 1].id + 1,
      name: req.body.name,
      age: req.body.age,
      country: req.body.country,
    });
    try {
      res.status(200).json(database);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

let port = 8000;

app.listen(port, () => {
  console.log(`Port is running at ${port}`);
});