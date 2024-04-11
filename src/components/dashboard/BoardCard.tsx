import { Board, useBoardStore } from '@/store/board';
import { SquareArrowOutUpRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const BoardCard = ({ title, desc, board_id }: Board) => {
    const navigate = useNavigate();
    const { deleteBoard } = useBoardStore();
    const handleDeleteBoard = () => {
        deleteBoard(board_id);
        toast({
            title: "Board deleted",
            variant: "destructive"
        })
    }
    return (
        <div className='bg-white flex items-center justify-between rounded-md p-5 shadow-md'>
            <div className='break-all overflow-wrap'>
                <p className='font-semibold text-lg lg:text-xl'>{title}</p>
                <p className='font-light text-sm'>{desc}</p>
            </div>
            <div className='flex gap-x-1'>
                <SquareArrowOutUpRight className='cursor-pointer' onClick={() => navigate(`/board/${board_id}`)} />
                <Trash2 className='cursor-pointer' onClick={handleDeleteBoard} />
            </div>
        </div>
    )
}

export default BoardCard;