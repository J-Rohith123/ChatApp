import React from 'react'
import Left from './left'
import Right from './right'
import '../css/Home.css'

function Home() {
  return (
    <div className='home'>
      <div className='container'>
      <Left/>
      <Right/>
      </div>
    </div>
  )
}

export default Home
