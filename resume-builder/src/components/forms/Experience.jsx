import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import { Brain } from "lucide-react";
import { AIChatSession } from "../../service/AiModel";

const Toast = () => (
  <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg shadow-lg">
    Details Updated
  </div>
);

const PROMPT = `
  Position title: {positionTitle}. Based on this title, generate a paragraph describing relevant work experience for a resume.
  Do not include experience level. Provide the response in plain text without any HTML or special formatting.
`;

function Experience() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState(resumeInfo.experience || []);
  const [showToast, setShowToast] = useState(false);
  const [loadingAI, setLoadingAI] = useState([]);

  useEffect(() => {
    if (resumeInfo?.experience) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo.experience]);

  useEffect(() => {
    if (experienceList !== resumeInfo.experience) {
      setResumeInfo((prev) => ({
        ...prev,
        experience: experienceList,
      }));
    }
  }, [experienceList, resumeInfo, setResumeInfo]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setExperienceList((prev) =>
      prev.map((exp, i) => (i === index ? { ...exp, [name]: value } : exp))
    );
  };

  const generateSummaryFromAI = async (index) => {
    if (!experienceList[index]?.title) {
      return;
    }

    setLoadingAI((prev) => ({ ...prev, [index]: true }));
    const prompt = PROMPT.replace("{positionTitle}", experienceList[index].title);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      let responseText = await result.response.text();
      const plainText = responseText.trim();

      setExperienceList((prev) =>
        prev.map((exp, i) =>
          i === index ? { ...exp, responsibilities: [plainText] } : exp
        )
      );

      setResumeInfo((prev) => ({
        ...prev,
        experience: experienceList,
      }));
    } catch (error) {
      console.error("Error generating summary:", error);
    } finally {
      setLoadingAI((prev) => ({ ...prev, [index]: false }));
    }
  };

  const handleResponsibilitiesChange = (index, event) => {
    const updatedResponsibilities = event.target.value.split("\n");
    setExperienceList((prev) =>
      prev.map((exp, i) =>
        i === index ? { ...exp, responsibilities: updatedResponsibilities } : exp
      )
    );
  };

  const addNewExperience = () => {
    setExperienceList((prev) => [
      ...prev,
      {
        title: "",
        company: "",
        location: "",
        state: "",
        startDate: "",
        endDate: "",
        responsibilities: [],
      },
    ]);
  };

  const removeExperience = () => {
    setExperienceList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const onSave = () => {
    setResumeInfo((prev) => ({
      ...prev,
      experience: experienceList,
    }));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your Previous Job Experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <input name="title" value={item?.title || ""} onChange={(event) => handleChange(index, event)} placeholder="Position Title" className="border p-2 w-full" />
              <input name="company" value={item?.company || ""} onChange={(event) => handleChange(index, event)} placeholder="Company Name" className="border p-2 w-full" />
              <input name="location" value={item?.location || ""} onChange={(event) => handleChange(index, event)} placeholder="Location" className="border p-2 w-full" />
              <input name="state" value={item?.state || ""} onChange={(event) => handleChange(index, event)} placeholder="State" className="border p-2 w-full" />
              <input type="date" name="startDate" value={item?.startDate || ""} onChange={(event) => handleChange(index, event)} className="border p-2 w-full" />
              <input type="date" name="endDate" value={item?.endDate || ""} onChange={(event) => handleChange(index, event)} className="border p-2 w-full" />
              <div className="col-span-2">
                <label className="text-xs">Responsibilities:</label>
                <button type="button" onClick={() => generateSummaryFromAI(index)} className="bg-blue-600 text-white flex gap-2 p-2 rounded float-right" disabled={loadingAI[index]}>
                  {loadingAI[index] ? "Generating..." : <><Brain className="h-4 w-4" /> Generate from AI</>}
                </button>
                <textarea className="w-full mt-2 p-2 border rounded min-h-[80px]" value={item.responsibilities.join("\n")} onChange={(event) => handleResponsibilitiesChange(index, event)} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={addNewExperience} className="bg-blue-500 text-white p-2 rounded">+ Add Experience</button>
        <button onClick={removeExperience} className="bg-red-500 text-white p-2 rounded mx-2">- Remove</button>
        <button className="bg-green-500 text-white p-2 rounded" onClick={onSave}>Save</button>
      </div>
      {showToast && <Toast />}
    </div>
  );
}

export default Experience;
