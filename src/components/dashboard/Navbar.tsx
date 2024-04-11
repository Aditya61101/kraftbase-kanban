import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useModal } from '@/store/modal';

const Navbar = () => {
      const { logout } = useAuthStore();
      const { openModal } = useModal();
      return (
            <>
                  <nav className='bg-white p-3 sticky flex justify-between items-center shadow-lg'>
                        <div className='text-xl font-semibold'>Kraftbase Kanban</div>
                        <div className='flex space-x-5'>
                              <Button className='h-9 px-3 md:h-10 md:px-4 md:py-2' variant="outline" onClick={() => openModal("board", "", null)}>Create Board</Button>
                              <Button className='flex gap-x-1 h-9 px-3 md:h-10 md:px-4 md:py-2' onClick={() => logout()}>
                                    <LogOut className='lg:w-4 w-3 mt-[2px]' />
                                    <span className='text-xs lg:text-base'>Logout</span>
                              </Button>
                        </div>
                  </nav>
            </>
      )
}

export default Navbar;