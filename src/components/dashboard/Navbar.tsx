import React from 'react'
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth';

const Navbar = () => {
      const { logout } = useAuthStore();
      return (
            <div className='w-screen'>
                  <nav className='bg-[#f8f8f8] p-3 flex justify-between items-center shadow-lg'>
                        <div className='text-xl font-semibold'>Kraftbase Kanban</div>
                        <div className='flex space-x-5'>
                              <Button>Create Board</Button>
                              <Button onClick={() => logout()} className='flex gap-x-2 items-center'>
                                    <LogOut />
                                    <span>Logout</span>
                              </Button>
                        </div>
                  </nav>
            </div>
      )
}

export default Navbar;