import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage/profile-page'
import UsersPage from './pages/UsersPage/users-page'
import ConnectionsPage from './pages/ConnectionsPage/connections-page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProfilePage />}></Route>
        <Route path='/users' element={<UsersPage />}></Route>
        <Route path='/connections' element={<ConnectionsPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
