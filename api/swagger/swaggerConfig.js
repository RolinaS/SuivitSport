// api/swagger/swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Suivi Sport & Nutrition',
      version: '1.0.0',
      description: 'Documentation des endpoints de votre application.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement',
      }
    ]
  },
  apis: ['./routes/*.js'], // <== Documentation extraite des fichiers routes
};

module.exports = swaggerJsdoc(options);
