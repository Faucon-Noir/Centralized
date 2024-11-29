import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js';
import { numberToArrayColor } from '@/app/helpers';
import { CircularProgress } from '@mui/material';
import React from 'react';

interface GraphiquePieProps {
	labels: Array<string>;
	data: Array<number>;
	title: string;
	hover: string;
	order?: number;
}

function GraphiquePie({
	labels,
	data,
	title,
	hover,
	order = 0,
}: GraphiquePieProps) {
	// Utilisation des types ChartData et ChartOptions pour corriger le typage
	const [datagraphique, setDataGraphique] = useState<ChartData<'pie'>>({
		labels: [],
		datasets: [],
	});

	const [optionsgraphique, setOptionsGraphique] = useState<
		ChartOptions<'pie'>
	>({});
	const [loading, setLoading] = useState(true); // Ajouter un état de chargement

	useEffect(() => {
		const data1: ChartData<'pie'> = {
			labels: labels,
			datasets: [
				{
					label: hover,
					backgroundColor: numberToArrayColor(data.length), // Génère un tableau de couleurs
					data: data,
					hoverOffset: 32, // Décalage au survol
				},
			],
		};

		const options: ChartOptions<'pie'> = {
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: title,
				},
			},
		};

		setDataGraphique(data1);
		setOptionsGraphique(options);
		setLoading(false); // Une fois que les données sont prêtes, on arrête le chargement
	}, [labels, data, hover, title]);

	if (loading) {
		return (
			<div
				style={{
					position: 'absolute',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100%',
				}}
			>
				<CircularProgress />
				Chargements des données...
			</div>
		);
	}

	return (
		<div
			className={
				order != 0 ? 'graph_pie graph_pie_' + order : 'graph_pie'
			}
		>
			<Pie data={datagraphique} options={optionsgraphique} />
		</div>
	);
}

export default GraphiquePie;
