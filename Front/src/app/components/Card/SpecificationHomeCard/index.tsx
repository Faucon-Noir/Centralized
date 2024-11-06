import './style.scss';
import { SpecificationHomeCardProps } from './type';
import { numberToColor } from '@/app/helpers';
import Link from 'next/link';

export default function SpecificationHomCard({
	id,
	name,
	color,
	start,
	end,
	budget,
	desc,
}: SpecificationHomeCardProps) {
	var startDate: String;
	var endDate: String;

	startDate = new Date(start).toLocaleDateString();
	endDate = new Date(end).toLocaleDateString();
	return (
		<>
			<div className='container_specification'>
				<div className='specification_name'>
					<h2>Nom du projet :</h2>
					<p
						style={{
							color: numberToColor(
								color !== undefined ? color : 0
							),
						}}
					>
						{name}
					</p>
				</div>
				<div className='specification_card_container'>
					<div className='first_line line'>
						<p>Date de début : {startDate}</p>
						<p>Date de fin : {endDate}</p>
					</div>
					<div className='second_line line'>
						<p>Budget : {budget} €</p>
						<p>Description : {desc}</p>
					</div>
					<div className='line'>
						<button>
							<Link
								href={`/specification/${id}`}
								style={{
									backgroundColor: numberToColor(
										color !== undefined ? color : 0
									),
								}}
							>
								En savoir plus
							</Link>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
