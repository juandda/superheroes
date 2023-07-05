const express = require('express');
const superheroesRouter = require('./routes/superheroRoutes');

const cors = require('cors');
const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());
app.use(cors());

// Rutas de superhéroes
app.use('/superheroes', superheroesRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
