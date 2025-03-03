import React, { useContext, useState , useEffect } from 'react'
import { ResumeInfoContext } from '../../context/ResumeInfoContext'


const Toast = () => {
  return (
    <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg shadow-lg">
      Details Updated
    </div>
  );
};

function PersonalDetails({enableNext}) {
  const {resumeInfo , setResumeInfo} = useContext(ResumeInfoContext);

  const [formData , setFormData] = useState({});
  const [showToast , setShowToast]= useState(false)

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

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, [showToast]);

  const onSave = (e)=>{
    e.preventDefault();
    enableNext(true);
    setShowToast(true);
  }

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Details</h2>
      <p>Get Started with Basic Details</p>

      <div className="flex flex-col items-center justify-center">
      {showToast && <Toast />}
      </div>

      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3 w-full'>
          <div>
            <label className='text-sm '>First Name </label>
            <br/>
            <input className='border-[1px]' name = "firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange}/>
          </div>

          <div>
            <label className='text-sm '>Last Name </label>
            <br/>
            <input className='border-[1px]' name = "lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange}/>
          </div>
          <div className='w-full'>
            <label className='text-sm'>Job Title </label>
            <br/>
            <input className='border-[1px] ' name = "jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange}/>
          </div>

          <div className='w-full'>
            <label className='text-sm'>Address </label>
            <br/>
            <input className='border-[1px] ' name = "address" defaultValue={resumeInfo?.address} required onChange={handleInputChange}/>
          </div>

          <div>
            <label className='text-sm'>Phone</label>
            <br/>
            <input className='border-[1px]' name = "phone" defaultValue={resumeInfo?.phone}  required onChange={handleInputChange}/>
          </div>

          <div>
            <label className='text-sm'>Email</label>
            <br/>
            <input className='border-[1px] ' name = "email" defaultValue={resumeInfo?.email} required onChange={handleInputChange}/>
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <button className='bg-green-400' type='submit'> Save </button>
        </div>
      </form>

    </div>
  )
}

export default PersonalDetails
