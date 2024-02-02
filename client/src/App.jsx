
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Header from './components/Header'

function App() {


  return (
    <>
    <Header/>
     <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
     </Routes>
    </>
  )
}

export default App
