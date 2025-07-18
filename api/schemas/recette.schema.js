// api/schemas/recette.schema.js
const Joi = require('joi');

const recetteSchema = Joi.object({
  utilisateur_id: Joi.number().integer().required(),
  nom: Joi.string().min(2).max(100).required(),
  type_repas_id: Joi.number().integer().allow(null)
});

module.exports = recetteSchema;
