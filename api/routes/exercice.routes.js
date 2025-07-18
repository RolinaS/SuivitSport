// api/routes/exercice.routes.js
const express = require('express');
const router = express.Router();
const exerciceController = require('../controllers/exercice.controller');
const validator = require('../utils/validator');
const exerciceSchema = require('../schemas/exercice.schema');

router.get('/', exerciceController.getAll);
router.get('/:id', exerciceController.getById);
router.post('/', validator(exerciceSchema), exerciceController.create);
router.put('/:id', validator(exerciceSchema), exerciceController.update);
router.post(
  '/complet',
  validator(require('../schemas/exerciceComplet.schema')),
  exerciceController.createWithSeries
);
router.delete('/:id', exerciceController.remove);

module.exports = router;
