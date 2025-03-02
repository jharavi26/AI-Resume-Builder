import React from 'react'
import AddResume from './Custom/AddResume'

function Dashboard() {
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next Job Role</p>
      <div className='grid grid-cols-2 md:grid-colos-3 lg:grid-cols-5'>
        <AddResume/>

      </div>
      
    </div>
  )
}

export default Dashboard
