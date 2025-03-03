import React, { useContext, useState } from 'react'
import { ResumeInfoContext } from '../../context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';

function PersonalDetails({enableNext}) {
  const {resumeInfo , setResumeInfo} = useContext(ResumeInfoContext);

  const [formData , setFormData] = useState({});
  const [loading , setLoading] = useState(false)

  const handleInputChange = (e)=>{
    enableNext?.(false)
    const {name, value} = e.target;

    setFormData((prevData)=>({
      ...prevData , 
      [name] : value,
    }))

    setResumeInfo((prev)=> ({ ...prev ,
        [name] :  value,
       }))
  }

  const onSave = (e)=>{
    e.preventDefault();
    enableNext(true);
    setLoading(true);
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Details</h2>
      <p>Get Started with Basic Details</p>

      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3 w-full'>
          <div>
            <label className='text-sm '>First Name </label>
            <br/>
            <input className='border-[1px]' name = "firstName" required onChange={handleInputChange}/>
          </div>

          <div>
            <label className='text-sm '>Last Name </label>
            <br/>
            <input className='border-[1px]' name = "lastName" required onChange={handleInputChange}/>
          </div>
          <div className='w-full'>
            <label className='text-sm'>Job Title </label>
            <br/>
            <input className='border-[1px] ' name = "jobTitle" required onChange={handleInputChange}/>
          </div>

          <div className='w-full'>
            <label className='text-sm'>Address </label>
            <br/>
            <input className='border-[1px] ' name = "address" required onChange={handleInputChange}/>
          </div>

          <div>
            <label className='text-sm'>Phone</label>
            <br/>
            <input className='border-[1px]' name = "phone" required onChange={handleInputChange}/>
          </div>

          <div>
            <label className='text-sm'>Email</label>
            <br/>
            <input className='border-[1px] ' name = "email" required onChange={handleInputChange}/>
          </div>

        </div>
        <div className='mt-3 flex justify-end'>
          <button className='bg-green-400' type='submit' disabled = {loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : "Save"}</button>
        </div>
      </form>
      
    </div>
  )
}

export default PersonalDetails
