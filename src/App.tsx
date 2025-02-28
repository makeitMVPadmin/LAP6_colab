import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ColabPage from './pages/ColabPage/ColabPage'
import { SidebarProvider } from './components/context/SidebarContext'
import { IdProvider } from './components/context/IdContext'
import { Helmet, HelmetProvider } from 'react-helmet-async'

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <IdProvider>
        <SidebarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ColabPage />}></Route>
            </Routes>
          </BrowserRouter>
        </SidebarProvider>
      </IdProvider>
    </HelmetProvider>
  )
}

export default App
