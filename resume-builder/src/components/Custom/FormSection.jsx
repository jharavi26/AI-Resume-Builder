import React, { useState } from 'react'
import PersonalDetails from '../forms/PersonalDetails'
import { ArrowLeft, ArrowRight, HomeIcon, LayoutGrid } from 'lucide-react'
import Summary from '../forms/Summary';
import Experience from '../forms/Experience';
import Education from '../forms/Education';
import Skills from '../forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';

function FormSection() {
  const [activeIndex , setActiveIndex] = useState(1);
  const [enableNext , setEnableNext] = useState(false);
  const {resumeId} = useParams();

  return (
    <div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5 '>
          <Link to ="/dashboard">
        <button><HomeIcon/></button>
        </Link>
        <button className=' bg-green-500 sieze = sm'> <LayoutGrid/>Theme</button>
        </div> 
        <div className='flex gap-2'>  { activeIndex >  1 && <button onClick={()=>setActiveIndex(activeIndex-1)}><ArrowLeft/></button> }
        <button className="flex gap-2 bg-green-600" size="sm" disabled = {!enableNext} onClick={()=>setActiveIndex(activeIndex+1)}>Next <ArrowRight/></button>
        </div>
      </div>
      {activeIndex == 1  ? <PersonalDetails enableNext ={(v)=> setEnableNext(v)}/>  
      : activeIndex == 2 ? <Summary enableNext = {(v)=>setEnableNext(v)} /> : 
      activeIndex == 3 ?
      <Experience/> :
      activeIndex ==4 ?
      <Education/> :
      activeIndex == 5 ?
      <Skills/> : 
      activeIndex === 6 ?
      <Navigate to={`/my-resume/${resumeId}/view`} replace />
       : null 
     }
    </div>
  )
}

export default FormSection
