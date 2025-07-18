// api/routes/recette.routes.js
const express = require('express');
const router = express.Router();
const recetteController = require('../controllers/recette.controller');
const validator = require('../utils/validator');
const recetteSchema = require('../schemas/recette.schema');

router.get('/', recetteController.getAll);
router.get('/:id', recetteController.getById);
router.post('/', validator(recetteSchema), recetteController.create);
router.put('/:id', validator(recetteSchema), recetteController.update);
router.delete('/:id', recetteController.remove);

module.exports = router;
