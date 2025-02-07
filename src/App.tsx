import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ColabPage from './pages/ColabPage/ColabPage'
import Layout from './components/Layout/Layout'

function App() {
  return (

    <BrowserRouter>
   
        <Routes>
          <Route path="/" element={<ColabPage />}></Route>
        </Routes>
   
    </BrowserRouter>

  )
}

export default App
