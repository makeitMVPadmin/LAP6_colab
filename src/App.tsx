import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ColabPage from './pages/ColabPage/ColabPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ColabPage />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
