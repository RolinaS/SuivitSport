// api/controllers/exercice.controller.js
const db = require('../models/db');

exports.getAll = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM exercice ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM exercice WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Exercice non trouvé' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { seance_id, nom, groupe_musculaire } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO exercice (seance_id, nom, groupe_musculaire)
       VALUES ($1, $2, $3) RETURNING *`,
      [seance_id, nom, groupe_musculaire]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { seance_id, nom, groupe_musculaire } = req.body;
  try {
    const result = await db.query(
      `UPDATE exercice SET seance_id=$1, nom=$2, groupe_musculaire=$3
       WHERE id=$4 RETURNING *`,
      [seance_id, nom, groupe_musculaire, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Exercice non trouvé' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createWithSeries = async (req, res) => {
    const { seance_id, nom, groupe_musculaire, series } = req.body;
  
    const client = await db.pool.connect(); // pour transaction
    try {
      await client.query('BEGIN');
  
      const exRes = await client.query(
        `INSERT INTO exercice (seance_id, nom, groupe_musculaire)
         VALUES ($1, $2, $3) RETURNING *`,
        [seance_id, nom, groupe_musculaire]
      );
  
      const exerciceId = exRes.rows[0].id;
  
      series.map((s, index) =>
        client.query(
          `INSERT INTO serie (exercice_id, numero, repetitions, poids, temps_repos)
           VALUES ($1, $2, $3, $4, $5)`,
          [exerciceId, index + 1, s.repetitions, s.poids, s.temps_repos]
        )
      )      
  
      await Promise.all(seriesQueries);
      await client.query('COMMIT');
  
      res.status(201).json({ message: 'Exercice et séries créés', exercice: exRes.rows[0] });
    } catch (err) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  };  

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM exercice WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Exercice non trouvé' });
    res.status(200).json({ message: 'Exercice supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
