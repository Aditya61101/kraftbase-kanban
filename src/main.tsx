import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/login/index.tsx'
import Dashboard from './pages/dashboard/index.tsx'
import DashboardLayout from './layout/dashboard-layout.tsx'
import BoardLayout from './layout/board-layout.tsx'
import BoardPage from './pages/board/index.tsx'

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  {
    element: <DashboardLayout />,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
    ]
  },
  {
    element: <BoardLayout />,
    children: [
      { path: '/board/:boardID', element: <BoardPage /> },
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
