import NoBoard from '@/components/dashboard/NoBoard';
import { useBoardStore } from '@/store/board';

const Dashboard = () => {
      const { boards } = useBoardStore();
      return (
            <>
                  {boards.length === 0 ? (
                        <NoBoard />
                  ) : (
                        <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                        </div>
                  )}
            </>
      )
}

export default Dashboard