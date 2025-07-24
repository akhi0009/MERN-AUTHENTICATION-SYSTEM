import React,{useContext} from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext.jsx'

const Header = () => {
  const { userData } = useContext(AppContext)
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
      <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6'></img>
      <h1 className='flex iems-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : 'User'}! <img className="w-8 aspect-square" src={assets.hand_wave}></img></h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>welcome to my application</h2>
      <p className='mb-8 max-w-md'>let's start sign up and verify your email</p>
      <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>Get started</button>
    </div>
  )
}

export default Header
