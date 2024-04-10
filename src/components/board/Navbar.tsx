import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useModal } from '@/store/modal';
import { Input } from '@/components/ui/input';
import { useSearchText } from '@/store/board';

const Navbar = () => {
    const { logout } = useAuthStore();
    const { openModal } = useModal();
    const { setSearchText } = useSearchText();
    return (
        <>
            <nav className='bg-white p-3 sticky flex justify-between items-center shadow-lg'>
                <div className='text-xl font-semibold'>Kraftbase Kanban</div>
                <Input className='w-1/2' placeholder={`🔍 Search for tasks using its name or labels`} onChange={(e) => setSearchText(e.target.value)}/>
                <div className='flex space-x-2'>
                    <Button variant="outline" onClick={() => openModal("category","")}>Add Category</Button>
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