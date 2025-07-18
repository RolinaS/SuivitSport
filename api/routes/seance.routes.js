// api/routes/seance.routes.js
const express = require('express');
const router = express.Router();
const seanceController = require('../controllers/seance.controller');
const validator = require('../utils/validator');
const seanceSchema = require('../schemas/seance.schema');

router.get('/', seanceController.getAll);
router.get('/:id', seanceController.getById);
router.get('/:id/exercices', seanceController.getExercicesWithSeries);
router.post('/', validator(seanceSchema), seanceController.create);
router.put('/:id', validator(seanceSchema), seanceController.update);
router.delete('/:id', seanceController.remove);

module.exports = router;
