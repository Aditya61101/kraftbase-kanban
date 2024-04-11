import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { useModal } from '@/store/modal';
import Navbar from '@/components/board/Navbar';
import AddCategory from '@/components/board/AddCategory';
import AddTask from '@/components/board/AddTask';
import EditTask from '@/components/board/EditTask';
import EditCategory from '@/components/board/EditCategory';

const BoardLayout = () => {
    const navigate = useNavigate();
    const { email } = useAuthStore();
    const { isOpen, type } = useModal();
    useEffect(() => {
        if (!email) navigate("/");
    }, [email, navigate])
    return (
        <div className='h-[91vh]'>
            <Navbar />
            {isOpen && type === "category" && <AddCategory />}
            {isOpen && type === "create-task" && <AddTask />}
            {isOpen && type === "edit-task" && <EditTask />}
            {isOpen && type === "edit-category" && <EditCategory />}
            <Outlet />
        </div>
    )
}

export default BoardLayout;