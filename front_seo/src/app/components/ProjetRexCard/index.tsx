import './style.css';
import { ProjetRexCardProps } from './type';

export default function ProjetRexCard({ id, name }: ProjetRexCardProps) {
    return (
        <>
            <a href={`/rex/${id}`}>
                <div className="projetRexCard">
                    <h2>
                        {name}
                    </h2>
                </div>
            </a>
        </>
    )
}