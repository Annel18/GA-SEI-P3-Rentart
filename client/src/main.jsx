import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Components
import App from './App.jsx'
import ArtCarousel from './components/Carousel.jsx'
import RegisterUser from './components/RegisterUser.jsx'
import Login from './components/Login.jsx'
import ArtIndex from './components/ArtIndex.jsx'
import Profile from './components/Profile.jsx'

//! Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ArtCarousel />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <RegisterUser />,
      },
      {
        path: '/gallery',
        element: <ArtIndex />,
      },
      {
        path: '/profile',
        element: <Profile />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
