import React, { useState } from 'react';
import {PlusSquare} from 'lucide-react'
import {X} from 'lucide-react'

function AddResume() {

  const [openDialog , setOpenDialog] = useState(false);
  return (
    <div>
      <div className='p-14 py-24 border items-center flex justify-center 
      bg-gray-200 rounded-lg mt-10 h-[280px]
      hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed' onClick={()=>setOpenDialog(true)}>
        <PlusSquare/>
      </div>

      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            {/* Close Button */}
            <button 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setOpenDialog(false)}
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-semibold">Create New Resume</h2>
            <p className="text-gray-600 mt-2 ">
              Add a Title for for yout New Project
            </p>

            <input placeholder='Ex.Full Stack Resume' className="border border-gray-400 rounded-lg p-2 mt-1 my-2 w-full focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-blue-500" />

            <div className="mt-4 flex justify-end">
              <button 
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition mr-2 "
              >
                Create
              </button>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                onClick={() => setOpenDialog(false)}
              >
                Close
              </button>
            </div>
          </div>
          </div>
      )}
      
    </div>
  )
}

export default AddResume
