import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './features/Layout/Components/Header'
import Footer from './features/Layout/Components/Footer'
import MainContent from './features/Layout/Components/MainContent'
import { TaskProvider } from './features/Dashboard/Components/Context'

function App() {
  

  return (
    <>
    
      <div className='header'>
      <Header></Header>
      </div>
      
      <div className='body'>
      <TaskProvider>
        <MainContent></MainContent>
        </TaskProvider>
      </div>      
      <div className='footer'>
      <Footer></Footer>
      </div>
      
    </>
  )
}

export default App
