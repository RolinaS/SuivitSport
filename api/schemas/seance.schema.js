// api/schemas/seance.schema.js
const Joi = require('joi');

const seanceSchema = Joi.object({
  utilisateur_id: Joi.number().integer().required(),
  date: Joi.date().required(),
  nom: Joi.string().max(100).allow(null, ''),
  note: Joi.string().allow(null, '')
});

module.exports = seanceSchema;
