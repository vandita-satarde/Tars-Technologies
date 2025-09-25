import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import GetintouchEntires from './pages/GetintouchEntires'
import AddCase from './pages/AddCase'
import AddBlog from './pages/AddBlog'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/getintouch' element={<GetintouchEntires />} />
        <Route path='/cases' element={<AddCase />} />
        <Route path='/blogs' element={<AddBlog />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
