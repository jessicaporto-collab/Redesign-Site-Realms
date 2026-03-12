import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import EduXGen from '../pages/EduXGen'
import MyClass from '../pages/MyClass'
import RealmsPersonas from '../pages/RealmsPersonas'
import EduRealms from '../pages/EduRealms'
import IPTVConteudo from '../pages/IPTVConteudo'
import SobreNos from '../pages/SobreNos'
import NaImprensa from '../pages/NaImprensa'
import Contato from '../pages/Contato'
import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/eduxgen', element: <EduXGen /> },
      { path: '/myclass', element: <MyClass /> },
      { path: '/realms-personas', element: <RealmsPersonas /> },
      { path: '/edurealms', element: <EduRealms /> },
      { path: '/iptv-conteudo', element: <IPTVConteudo /> },
      { path: '/sobre-nos', element: <SobreNos /> },
      { path: '/na-imprensa', element: <NaImprensa /> },
      { path: '/contato', element: <Contato /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
