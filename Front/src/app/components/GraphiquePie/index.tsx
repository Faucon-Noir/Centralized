import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { numberToArrayColor } from '@/app/helpers';

function GraphiquePie({ labels, data, title, hover }: { labels: Array<string>, data: Array<any>, title: string, hover: string }) {
    const [datagraphique, setDataGraphique] = useState({});
    const [optionsgraphique, setOptionsGraphique] = useState({});
    const [loading, setLoading] = useState(true); // Ajouter un état de chargement

    useEffect(() => {
        const data1 = {
            labels: labels,
            datasets: [
                {
                    label: hover,
                    backgroundColor: numberToArrayColor(data.length),
                    data: data,
                    hoverOffset: 32
                }
            ]
        };

        const options = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        };

        setDataGraphique(data1);
        setOptionsGraphique(options);
        setLoading(false); // Une fois que les données sont prêtes, on arrête le chargement
    }, []);

    if (loading) {
        return <div>Chargement des données...</div>;
    }

    return (
        <>
            <Pie data={datagraphique} options={optionsgraphique} />
        </>
    );
}

export default GraphiquePie;