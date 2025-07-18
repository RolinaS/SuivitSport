// api/utils/validator.js
module.exports = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          message: 'Validation échouée',
          details: error.details.map(d => d.message)
        });
      }
      next();
    };
  };
  