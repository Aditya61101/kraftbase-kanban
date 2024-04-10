import NoBoard from '@/components/dashboard/NoBoard';
import BoardCard from '@/components/dashboard/BoardCard';
import { useAuthStore } from '@/store/auth';
import { useBoardStore } from '@/store/board';
import { useMemo } from 'react';

const Dashboard = () => {
      const { boards } = useBoardStore();
      const { email } = useAuthStore();
      const userBoards = useMemo(() => boards.filter((board) => board.email_id === email), [boards, email]);
      return (
            <div className="bg-[#f8f8f8] h-full px-4 pt-8">
                  {userBoards.length === 0 ? (
                        <NoBoard />
                  ) : (
                        <div className='grid gap-x-2 gap-y-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                              {userBoards.map(board => <BoardCard key={board.board_id} {...board} />)}
                        </div>
                  )}
            </div>
      )
}

export default Dashboard