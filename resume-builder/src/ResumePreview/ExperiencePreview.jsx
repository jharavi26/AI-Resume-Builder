import React from "react";

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience?.map((exp, index) => (
        <div key={index} className="my-5">
          <h2 className="text-sm font-bold" style={{ color: resumeInfo?.themeColor }}>
            {exp?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {exp?.company}, {exp?.location} , {exp?.state} , 
            <span>
              {exp?.startDate} – {exp?.currentlyWorking ? "Present" : exp?.endDate}
            </span>
          </h2>

          {exp?.responsibilities?.length > 0 && (
            <ul className="text-xs my-2 font-bold list-disc pl-4">
              {exp.responsibilities.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
