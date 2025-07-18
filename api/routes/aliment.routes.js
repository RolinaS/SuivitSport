// api/routes/aliment.routes.js
const express = require('express');
const router = express.Router();
const alimentController = require('../controllers/aliment.controller');
const validator = require('../utils/validator');
const alimentSchema = require('../schemas/aliment.schema');

router.get('/', alimentController.getAll);
router.get('/:nom', alimentController.getByName);
router.get('/:id', alimentController.getById);
router.post('/', validator(alimentSchema), alimentController.create);
router.put('/:id', validator(alimentSchema), alimentController.update);
router.delete('/:id', alimentController.remove);

module.exports = router;
