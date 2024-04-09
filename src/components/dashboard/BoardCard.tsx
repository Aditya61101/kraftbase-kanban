import { Board } from '@/store/board';
import { SquareArrowOutUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BoardCard = ({ title, desc, board_id }:Board) => {
    const navigate = useNavigate();
    return (
        <div className='bg-white flex items-center justify-between rounded-md p-5 shadow-md'>
            <div>
                <p className='font-semibold text-xl'>{title}</p>
                <p className='font-light'>{desc}</p>
            </div>
            <SquareArrowOutUpRight className='cursor-pointer' onClick={() => navigate(`/board/${board_id}`)}/>
        </div>
    )
}

export default BoardCard;