import { Button } from '@/components/ui/button';
import { LogOut, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useModal } from '@/store/modal';
import { Input } from '@/components/ui/input';
import { useSearchText } from '@/store/board';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { logout } = useAuthStore();
    const { openModal } = useModal();
    const { setSearchText } = useSearchText();
    return (
        <>
            <nav className='bg-white p-3 sticky flex justify-between items-center shadow-lg'>
                <div className='flex items-center gap-x-1'>
                    <Link to={"/boards"}><ArrowLeft className='lg:h-10 h-5 mt-[2px]' /></Link>
                    <span className='lg:text-xl font-semibold'>Kraftbase Kanban</span>
                </div>
                <Input className=' w-[35%] lg:w-1/2' placeholder={`🔍 Search for tasks using its name or labels`} onChange={(e) => setSearchText(e.target.value)} />
                <div className='flex space-x-2'>
                    <Button className='hidden lg:block' variant="outline" onClick={() => openModal("category", "", null)}>Add Category</Button>
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