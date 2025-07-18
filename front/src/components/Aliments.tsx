'use client';

import { useEffect, useState } from 'react';

type Aliment = {
  id: number;
  nom: string;
  proteine: number;
  glucide: number;
  lipide: number;
  matiere_grasse: number;
  kilocalorie: number;
  famille_id: number;
};

export default function AlimentList() {
  const [aliments, setAliments] = useState<Aliment[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/aliments')
      .then((res) => res.json())
      .then((data) => setAliments(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Liste des aliments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aliments.map((aliment) => (
          <div key={aliment.id} className="p-4 border rounded shadow hover:shadow-lg">
            <h3 className="text-lg font-semibold">{aliment.nom}</h3>
            <p>Kcal: {aliment.kilocalorie}</p>
            <p>Protéines: {aliment.proteine}g</p>
            <p>Glucides: {aliment.glucide}g</p>
            <p>Lipides: {aliment.lipide}g</p>
          </div>
        ))}
      </div>
    </div>
  );
}
