import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import DashboardLayout from './layout/dashboard-layout.tsx'
import BoardLayout from './layout/board-layout.tsx'
import { LoginPage, BoardPage, BoardsPage } from "@/pages/index"
import { Loader } from 'lucide-react'
import { Toaster } from '@/components/ui/toaster'

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  {
    element: <DashboardLayout />,
    children: [
      { path: '/boards', element: <BoardsPage /> },
    ]
  },
  {
    element: <BoardLayout />,
    children: [
      { path: '/board/:boardID', element: <BoardPage /> },
    ]
  },
  { path: '*', element: <Navigate to="/" replace /> }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Loader size={30} />}>
      <RouterProvider router={router} />
      <Toaster/>
    </Suspense>
  </React.StrictMode>,
)
