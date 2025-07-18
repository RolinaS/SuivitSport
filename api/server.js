const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

// Models
const db = require('./models/db');

// Routes import
const alimentRoutes = require('./routes/aliment.routes');
const recetteRoutes = require('./routes/recette.routes');
const seanceRoutes = require('./routes/seance.routes');
const exerciceRoutes = require('./routes/exercice.routes');

// Middlewares
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Serveur lancé sur ${process.env.API_URL}:${process.env.PORT}`);
});

db.query('SELECT NOW()')
  .then(res => console.log('Connexion à PostgreSQL réussie :', res.rows[0]))
  .catch(err => console.error('Erreur de connexion à PostgreSQL :', err));

const fs = require('fs');
const yaml = require('yaml');
const swaggerUi = require('swagger-ui-express');
  
// Routes
// 1. Import routes API AVANT Swagger
app.use('/api/aliments', alimentRoutes);
app.use('/api/recettes', recetteRoutes);
app.use('/api/exercices', exerciceRoutes);
app.use('/api/seances', seanceRoutes);

// 2. Swagger
const swaggerDocument = yaml.parse(fs.readFileSync('./swagger/swagger.yaml', 'utf8'));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
