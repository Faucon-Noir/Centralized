import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js';
import CircularProgress from '@mui/material/CircularProgress';

interface GraphiqueLineProps {
	labels: Array<string>;
	data: Array<number>;
	title: string;
	hover: string;
	order?: Number;
}

function GraphiqueLine({
	labels,
	data,
	title,
	hover,
	order = 0,
}: GraphiqueLineProps) {
	// Utilisation des types ChartData et ChartOptions pour corriger le typage
	const [datagraphique, setDataGraphique] = useState<ChartData<'line'>>({
		labels: [],
		datasets: [],
	});

	const [optionsgraphique, setOptionsGraphique] = useState<
		ChartOptions<'line'>
	>({});
	const [loading, setLoading] = useState(true); // Ajouter un état de chargement

	useEffect(() => {
		const data1: ChartData<'line'> = {
			labels: labels,
			datasets: [
				{
					label: hover,
					data: data,
					backgroundColor: 'rgba(75, 192, 192, 0.2)',
					borderColor: 'rgba(75, 192, 192, 1)',
					borderWidth: 1,
				},
			],
		};

		const options: ChartOptions<'line'> = {
			indexAxis: 'x', // 'x' pour un graphique en barre vertical
			scales: {
				x: {
					display: true,
					title: {
						display: true,
						text: 'Semaine',
						padding: { top: 20, bottom: 0 }, // Correct padding syntax
						align: 'end',
					},
					ticks: {
						maxRotation: 45,
						minRotation: 45,
					},
				},
				y: {
					beginAtZero: true,
					title: {
						display: true,
						text: 'tickets ouverts',
						padding: { top: 20, bottom: 0 }, // Correct padding syntax
						align: 'end',
					},
				},
			},
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: title,
				},
				legend: {
					display: false,
				},
			},
			maintainAspectRatio: false, // Optionnel si tu veux que le graphique soit responsif
		};

		setDataGraphique(data1);
		setOptionsGraphique(options);
		setLoading(false); // Une fois que les données sont prêtes, on arrête le chargement
	}, [labels, data, hover, title, order]); // Ajout des dépendances pour éviter les avertissements de React

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
				order != 0 ? 'graph_line graph_line_' + order : 'graph_line'
			}
		>
			<Line data={datagraphique} options={optionsgraphique} />
		</div>
	);
}

export default GraphiqueLine;
