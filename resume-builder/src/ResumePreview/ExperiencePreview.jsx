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

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{ color: resumeInfo?.themeColor }}
          >
            {experience?.title}
          </h2>
          <h2 className="text-xs flex justify-between">
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              {experience?.startDate} To{" "}
              {experience?.currentlyWorking ? "Present" : experience.endDate}
            </span>
          </h2>
          <ul className="text-xs my-2 font-bold list-disc pl-4">
            {experience?.workSummery.split("\n").map((line, index) => {
              // Remove any leading bullet points to prevent duplication
              const cleanedLine = line.replace(/^•\s*/, "").trim();
              return <li key={index}>{cleanedLine}</li>;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
