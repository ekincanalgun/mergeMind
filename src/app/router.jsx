import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@shared/layouts/MainLayout'
import LearnLayout from '@shared/layouts/LearnLayout'
import HomePage from '@pages/HomePage/HomePage'
import LearnPage from '@pages/LearnPage/LearnPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/learn',
    element: <LearnLayout />,
    children: [
      {
        index: true,
        element: <LearnPage />,
      },
      {
        path: ':commandId',
        element: <LearnPage />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '16px',
      }}>
        <h1>404</h1>
        <p>Sayfa bulunamadi</p>
        <a href="/">Ana Sayfaya Don</a>
      </div>
    ),
  },
])

export default router
