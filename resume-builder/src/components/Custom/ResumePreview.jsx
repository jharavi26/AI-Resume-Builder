import React, { useContext , useEffect } from "react";
import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import PersonalPreviewDetails from "../../ResumePreview/PersonalPreviewDetails";
import SummaryPreview from "../../ResumePreview/SummaryPreview";
import ExperiencePreview from "../../ResumePreview/ExperiencePreview";
import EducationPreview from "../../ResumePreview/EducationPreview";
import SkillsPreview from "../../ResumePreview/SkillsPreview";
import { useParams } from "react-router-dom";

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const {resumeId} = useParams();

  
  // Save resume data to localStorage whenever resumeInfo updates
  useEffect(() => {
    if (resumeId && resumeInfo) {
      sessionStorage.setItem(resumeId, JSON.stringify(resumeInfo));
      console.log("Saved to localStorage:", resumeId, resumeInfo); // Debugging
    }
  }, [resumeId, resumeInfo]);

  return (
    <div>
      <PersonalPreviewDetails resumeInfo={resumeInfo} />
      <SummaryPreview resumeInfo={resumeInfo} />

      {resumeInfo?.experience?.length > 0 && (
        <ExperiencePreview resumeInfo={resumeInfo} />
      )}

      {resumeInfo?.education?.length > 0 && (
        <EducationPreview resumeInfo={resumeInfo} />
      )}

      {resumeInfo?.skills?.length > 0 && (
        <SkillsPreview resumeInfo={resumeInfo}/>
      )}


    </div>
  );
}

export default ResumePreview;
