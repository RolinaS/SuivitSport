// api/controllers/aliment.controller.js
const db = require('../models/db');

// Récupérer tous les aliments
exports.getAll = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM aliment ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getByName = async (req, res) => {
  const { nom } = req.params;
  try {
    const result = await db.query(
      `SELECT * FROM aliment WHERE LOWER(nom) = LOWER($1) LIMIT 1`,
      [nom]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aliment non trouvé' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Récupérer un aliment par ID
exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM aliment WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Aliment non trouvé' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Créer un nouvel aliment
exports.create = async (req, res) => {
  const { nom, proteine, lipide, glucide, matiere_grasse, kilocalorie, famille_id } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO aliment (nom, proteine, lipide, glucide, matiere_grasse, kilocalorie, famille_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nom, proteine, lipide, glucide, matiere_grasse, kilocalorie, famille_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un aliment
exports.update = async (req, res) => {
  const { id } = req.params;
  const { nom, proteine, lipide, glucide, matiere_grasse, kilocalorie, famille_id } = req.body;
  try {
    const result = await db.query(
      `UPDATE aliment SET nom=$1, proteine=$2, lipide=$3, glucide=$4, matiere_grasse=$5, kilocalorie=$6, famille_id=$7
       WHERE id=$8 RETURNING *`,
      [nom, proteine, lipide, glucide, matiere_grasse, kilocalorie, famille_id, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Aliment non trouvé' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un aliment
exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM aliment WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Aliment non trouvé' });
    res.status(200).json({ message: 'Aliment supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
