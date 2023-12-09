import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Components
import App from './App.jsx'
import ArtCarousel from './components/Carousel.jsx'
import RegisterUser from './components/RegisterUser.jsx'
import Login from './components/Login.jsx'
import ArtIndex from './components/ArtIndex.jsx'
import ArtCollection from './components/ArtCollection.jsx'
import IndArtPage from './components/IndArtPage.jsx'
import Profile from './components/Profile.jsx'
import About from './components/About.jsx'

// Loader
import { getIndArt } from './utils/loaders/artLoader.js'


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
      },{
        path: '/about',
        element: <About />,
      },
      {
        path: '/gallery',
        element: <ArtIndex />,
        // loader: getUser
      },
      {
        path: '/collection',
        element: <ArtCollection />,
        // loader: getUser
      },
      {
        path: '/art/:artId',
        element: <IndArtPage />,
        loader: async ({ params }) => getIndArt(params.artId)
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
