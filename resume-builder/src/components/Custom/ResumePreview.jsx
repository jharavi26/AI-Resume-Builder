import React, { useContext } from 'react'
import { ResumeInfoContext } from '../../context/ResumeInfoContext'
import PersonalPreviewDetails from '../../ResumePreview/PersonalPreviewDetails'
import SummaryPreview from '../../ResumePreview/SummaryPreview'

function ResumePreview() {

  const {resumeInfo , setResumeInfo} = useContext(ResumeInfoContext)
  return (
    <div>
      <PersonalPreviewDetails resumeInfo = {resumeInfo}/>
      <SummaryPreview resumeInfo = {resumeInfo}/>
      
    </div>
  )
}

export default ResumePreview
