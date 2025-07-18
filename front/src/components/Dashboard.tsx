'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { CheckCircle } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const data = {
  labels: days,
  datasets: [
    {
      label: 'Apport kcal',
      data: [601, 2059, 2157, 2302, 1154, 233],
      borderColor: '#10b981',
      backgroundColor: '#6ee7b7',
      tension: 0.3,
    },
  ],
};

export default function Dashboard() {
  const targetKcal = 2302;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-2">Suivi calorique hebdomadaire</h2>
        <Line data={data} />
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-4">Plans journaliers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {days.map((day, index) => {
            const kcal = data.datasets[0].data[index];
            const progress = Math.min((kcal / targetKcal) * 100, 100);

            return (
              <div key={day} className="rounded border p-4 shadow bg-gray-50">
                <h3 className="text-md font-bold mb-2">{day}</h3>
                <div className="text-sm mb-2 text-gray-600">
                  {kcal} kcal / {targetKcal} kcal
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-green-400"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-center">
                  <div className="bg-green-100 p-2 rounded">Petit-déj</div>
                  <div className="bg-green-100 p-2 rounded">Déjeuner</div>
                  <div className="bg-green-100 p-2 rounded">Dîner</div>
                  <div className="bg-green-100 p-2 rounded">Collation</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
