import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import GetintouchEntires from './pages/GetintouchEntires'
import AddCase from './pages/AddCase'
import AddBlog from './pages/AddBlog'
import AddClients from './pages/AddClients'
import AddProduct from './pages/AddProduct'
import QuotesList from './pages/Quote'
import Carrer from './pages/carrerpage'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/products' element={<AddProduct />} />
        <Route path='/cases' element={<AddCase />} />
        <Route path='/blogs' element={<AddBlog />} />
        <Route path='/getintouch' element={<GetintouchEntires />} />

        <Route path='/clients' element={<AddClients />} />
        <Route path='/GetQuote' element={<QuotesList/>}/>
        <Route path='/career' element={<Carrer/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
} 

export default App
