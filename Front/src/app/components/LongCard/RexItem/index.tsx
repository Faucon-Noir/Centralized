import { TaskItemProps } from './type';
import { numberToColorRex, numberToColorRexButton } from '@/app/helpers';
import "./style.scss"
function RexItem({ id, name, status }: TaskItemProps) {

    return (

        <div className='card' style={{ backgroundColor: numberToColorRex(status) }}>
            <h3 >{name}</h3>
            <div className='line'>
                <button><a href={`/rex/${id}`}  style={{ backgroundColor: numberToColorRexButton(status) }}>
                    {status == true ? "Ouvrir le rex": "Terminer le projet"}
                </a></button>
            </div>
        </div>

    );
}

export default RexItem;