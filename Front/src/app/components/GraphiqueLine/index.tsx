import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { numberToArrayColor } from '@/app/helpers';

function GraphiqueLine({ labels, data }: { labels: Array<string>, data: Array<any> }) {
    const [datagraphique, setDataGraphique] = useState({});
    const [optionsgraphique, setOptionsGraphique] = useState({});
	const [loading, setLoading] = useState(true); // Ajouter un état de chargement

    useEffect(() => {
        const data1 = {
            labels: labels,
            datasets: [
                {
                    label: 'Ventes',
                    data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ]
        };
        setDataGraphique(data1);
        const options = { 
          indexAxis: "x" as const, // 'x' pour un graphique en barre vertical
          scales: {
            y: {
            beginAtZero: true,
            },
          },
          responsive: true,
        //   maintainAspectRatio: false,
        };
        setOptionsGraphique(options);
        setLoading(false); // Une fois que les données sont prêtes, on arrête le chargement
    }, []);

	if (loading) {
		return <div>Chargement des données...</div>;
	}

    return (
        <>
            <Line data={datagraphique} options={optionsgraphique} />
        </>
    );
}

export default GraphiqueLine;
