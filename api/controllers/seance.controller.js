// api/controllers/seance.controller.js
const db = require('../models/db');

exports.getAll = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM seance ORDER BY date DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM seance WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Séance non trouvée' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExercicesWithSeries = async (req, res) => {
  const { id } = req.params;

  try {
    // Récupérer tous les exercices de la séance
    const exercicesRes = await db.query(
      `SELECT * FROM exercice WHERE seance_id = $1`,
      [id]
    );
    const exercices = exercicesRes.rows;

    if (exercices.length === 0) {
      return res.status(404).json({ message: 'Aucun exercice trouvé pour cette séance' });
    }

    // Pour chaque exercice, récupérer ses séries
    const result = await Promise.all(exercices.map(async (ex) => {
      const seriesRes = await db.query(
        `SELECT id, numero, repetitions, poids, temps_repos
         FROM serie WHERE exercice_id = $1 ORDER BY numero ASC`,
        [ex.id]
      );
      return {
        ...ex,
        series: seriesRes.rows
      };
    }));

    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { utilisateur_id, date, nom, note } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO seance (utilisateur_id, date, nom, note)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [utilisateur_id, date, nom, note]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { utilisateur_id, date, nom, note } = req.body;
  try {
    const result = await db.query(
      `UPDATE seance SET utilisateur_id = $1, date = $2, nom = $3, note = $4
       WHERE id = $5 RETURNING *`,
      [utilisateur_id, date, nom, note, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Séance non trouvée' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM seance WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Séance non trouvée' });
    res.status(200).json({ message: 'Séance supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
