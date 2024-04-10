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
                              <Button variant="outline" onClick={() => openModal("board","",null)}>Create Board</Button>
                              <Button onClick={() => logout()} className='flex gap-x-1'>
                                    <LogOut size={17} className='mt-[2px]' />
                                    <span>Logout</span>
                              </Button>
                        </div>
                  </nav>
            </>
      )
}

export default Navbar;