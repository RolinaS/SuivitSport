// api/schemas/exercice.schema.js
const Joi = require('joi');

const exerciceSchema = Joi.object({
  seance_id: Joi.number().integer().required(),
  nom: Joi.string().min(2).max(100).required(),
  groupe_musculaire: Joi.string().max(100).allow(null, '')
});

module.exports = exerciceSchema;
