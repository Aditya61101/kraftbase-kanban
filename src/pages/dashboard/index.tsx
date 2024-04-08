import NoBoard from '@/components/dashboard/NoBoard';

const Dashboard = () => {
      const boards = [];
      return (
            <>
                  {boards.length === 0 ? (
                        <NoBoard />
                  ) : (<p>Boards</p>)}
            </>
      )
}

export default Dashboard