import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ColabPage from './pages/ColabPage/ColabPage'
import { SidebarProvider } from './components/context/SidebarContext'
import { IdProvider } from './components/context/IdContext'

function App() {
  return (
    <IdProvider>
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ColabPage />}></Route>
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
    </IdProvider>
  )
}

export default App
