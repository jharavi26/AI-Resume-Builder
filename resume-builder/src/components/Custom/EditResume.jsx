import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from './FormSection';
import ResumePreview from './ResumePreview';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import Dummy from '../../data/Dummy';
import Dashboard from '../Dashboard';

function EditResume() {

  const params = useParams();
  const [resumeInfo , setResumeInfo] = useState();
  const [showPreview , setShowPreview] = useState(false);

  useEffect(()=>{
    setResumeInfo(Dummy)
  },[])

  return (
    <ResumeInfoContext.Provider value ={{resumeInfo , setResumeInfo , showPreview , setShowPreview}}>

    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      <FormSection/>
      <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
