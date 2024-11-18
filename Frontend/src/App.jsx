
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element= {<Navigate to='/login'/>} />
        <Route  path='/login' element={<Login/>} />
        <Route  path='/signup' element={<Signup/>}/>
        <Route  path='/home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </>
  )
}

export default App
