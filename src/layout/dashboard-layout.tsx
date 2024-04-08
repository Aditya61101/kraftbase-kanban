import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { useNavigate, Outlet } from 'react-router-dom';
import Navbar from '@/components/dashboard/Navbar';

const DashboardLayout = () => {
      const navigate = useNavigate();
      const { email } = useAuthStore();
      useEffect(() => {
            if (!email) navigate("/");
      }, [email, navigate])
      return (
            <>
                  <Navbar />
                  <Outlet />
            </>
      )
}

export default DashboardLayout;