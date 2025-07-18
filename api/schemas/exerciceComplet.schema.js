// api/schemas/exerciceComplet.schema.js
const Joi = require('joi');

const serieSchema = Joi.object({
  repetitions: Joi.number().integer().min(1).required(),
  poids: Joi.number().min(0).required(),
  temps_repos: Joi.number().integer().min(0).required()
});

const exerciceCompletSchema = Joi.object({
  seance_id: Joi.number().integer().required(),
  nom: Joi.string().min(2).max(100).required(),
  groupe_musculaire: Joi.string().max(100).allow('', null),
  series: Joi.array().items(serieSchema).min(1).required()
});

module.exports = exerciceCompletSchema;
