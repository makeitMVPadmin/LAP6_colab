import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ColabPage from './pages/ColabPage/ColabPage'

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
