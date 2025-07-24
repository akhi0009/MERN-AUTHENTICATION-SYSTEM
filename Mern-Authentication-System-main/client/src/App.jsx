import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Emailverify from './pages/Emailverify'
import Resetpass from './pages/Resetpass'
import Home from './pages/Home'
import { ToastContainer} from 'react-toastify'; // 'toast' might not be used here but was in the last image's import line
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/emailverify' element={<Emailverify/>}/>
        <Route path='/resetpass' element={<Resetpass/>}/>
      </Routes>
    </div>
  )
}

export default App
