import React, { useState } from 'react'
import PersonalDetails from '../forms/PersonalDetails'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import Summary from '../forms/Summary';

function FormSection() {
  const [activeIndex , setActiveIndex] = useState(1);
  const [enableNext , setEnableNext] = useState(false);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <button className=' bg-green-500 sieze = sm'> <LayoutGrid/>Theme</button>
        <div className='flex gap-2'>  { activeIndex >  1 && <button onClick={()=>setActiveIndex(activeIndex-1)}><ArrowLeft/></button> }
        <button className="flex gap-2 bg-green-600" size="sm" disabled = {!enableNext} onClick={()=>setActiveIndex(activeIndex+1)}>Next <ArrowRight/></button>
        </div>
      </div>
      {activeIndex == 1  ? <PersonalDetails enableNext ={(v)=> setEnableNext(v)}/>  
      : activeIndex == 2 ? <Summary enableNext = {(v)=>setEnableNext(v)} /> : null
     }
    </div>
  )
}

export default FormSection
