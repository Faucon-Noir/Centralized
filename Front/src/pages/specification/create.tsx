'use client';
import './create.scss';
import SpecificationForm from '@/app/components/Form/specificationForm';

export default function CreateSpecification({ userData }: any) {
	return (
		<>
			<div className='container'>
				<div className='wrapper'>
					<SpecificationForm userData={userData} />
				</div>
			</div>
		</>
	);
}
