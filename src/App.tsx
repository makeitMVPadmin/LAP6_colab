import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ColabPage from './pages/ColabPage/ColabPage'
import { SidebarProvider } from './components/context/SidebarContext'

function App() {
  return (
    <SidebarProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ColabPage />}></Route>
        </Routes>
      </BrowserRouter>
    </SidebarProvider>
  )
}

export default App
