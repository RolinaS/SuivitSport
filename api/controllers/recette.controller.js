// api/controllers/recette.controller.js
const db = require('../models/db');

exports.getAll = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM recette ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM recette WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Recette non trouvée' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { utilisateur_id, nom, type_repas_id } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO recette (utilisateur_id, nom, type_repas_id)
       VALUES ($1, $2, $3) RETURNING *`,
      [utilisateur_id, nom, type_repas_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { utilisateur_id, nom, type_repas_id } = req.body;
  try {
    const result = await db.query(
      `UPDATE recette SET utilisateur_id=$1, nom=$2, type_repas_id=$3
       WHERE id=$4 RETURNING *`,
      [utilisateur_id, nom, type_repas_id, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Recette non trouvée' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM recette WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Recette non trouvée' });
    res.status(200).json({ message: 'Recette supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
