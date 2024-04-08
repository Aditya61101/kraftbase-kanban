import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from '@/components/dashboard/Navbar';
import CreateBoard from '@/components/dashboard/CreateBoard';
import { useModal } from '@/store/modal';

const DashboardLayout = () => {
      const navigate = useNavigate();
      const { email } = useAuthStore();
      const { isOpen } = useModal();
      useEffect(() => {
            if (!email) navigate("/");
      }, [email, navigate])
      return (
            <>
                  <Navbar />
                  {isOpen && <CreateBoard />}
                  <Outlet />
            </>
      )
}

export default DashboardLayout;