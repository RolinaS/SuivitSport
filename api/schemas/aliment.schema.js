// api/schemas/aliment.schema.js
const Joi = require('joi');

const alimentSchema = Joi.object({
  nom: Joi.string().min(2).max(100).required(),
  proteine: Joi.number().min(0).required(),
  lipide: Joi.number().min(0).required(),
  glucide: Joi.number().min(0).required(),
  matiere_grasse: Joi.number().min(0).required(),
  kilocalorie: Joi.number().min(0).required(),
  famille_id: Joi.number().integer().allow(null)  // autorise null ou un entier
});

module.exports = alimentSchema;
