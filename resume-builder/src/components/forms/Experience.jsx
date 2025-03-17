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
  Position title: {positionTitle}. Based on this title, generate 5-7 bullet points describing relevant work experience for a resume. 
  Do not include experience level. Provide the response in plain text without any HTML or special formatting.
`;

function Experience() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState(resumeInfo.experience || []);
  const [showToast, setShowToast] = useState(false);

  // ✅ Ensure experienceList updates when resumeInfo.experience changes
  useEffect(() => {
    if (resumeInfo?.experience) {
      setExperienceList(resumeInfo.experience);
    }
  }, [resumeInfo.experience]);

  // ✅ Sync experienceList with resumeInfo on update
  useEffect(() => {
    if (experienceList !== resumeInfo.experience) {
      setResumeInfo((prev) => ({
        ...prev,
        experience: experienceList,
      }));
    }
  }, [experienceList, resumeInfo, setResumeInfo]);

  // ✅ Handle input field changes
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    setExperienceList((prev) => {
      const updatedExperience = [...prev];
      updatedExperience[index] = { ...updatedExperience[index], [name]: value };
      return updatedExperience;
    });
  };

  // ✅ Handle AI-generated summary update
  const GenerateSummeryFromAI = async (index) => {
    if (!experienceList[index]?.title) {
      return;
    }

    const prompt = PROMPT.replace("{positionTitle}", experienceList[index].title);

    try {
      const result = await AIChatSession.sendMessage(prompt);
      let resp = await result.response.text();

      // ✅ Remove HTML tags using regex
      const plainText = resp.replace(/<[^>]*>/g, "").trim();

      // ✅ Update responsibilities in state
      setExperienceList((prevExperience) => {
        const updatedExperience = [...prevExperience];
        updatedExperience[index] = {
          ...updatedExperience[index],
          responsibilities: plainText,
        };
        return updatedExperience;
      });

      // ✅ Ensure resumeInfo updates immediately
      setResumeInfo((prev) => ({
        ...prev,
        experience: [...experienceList],
      }));
    } catch (error) {
      console.error("Error generating summary:", error);
    }
  };

  // ✅ Handle responsibilities formatting (adding bullets)
  const handleWorkSummaryChange = (index, event) => {
    let newText = event.target.value;

    // Remove extra bullets and add bullets properly
    const formattedText = newText
      .split("\n")
      .map((line) => {
        let trimmedLine = line.trim();
        if (!trimmedLine) return ""; // Keep empty lines
        return trimmedLine.startsWith("•") ? trimmedLine : `• ${trimmedLine}`;
      })
      .join("\n");

    setExperienceList((prevExperience) => {
      const updatedExperience = [...prevExperience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        responsibilities: formattedText,
      };
      return updatedExperience;
    });
  };

  // ✅ Add new experience entry
  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        location: "",
        state: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      },
    ]);
  };

  // ✅ Remove last experience entry
  const RemoveExperience = () => {
    setExperienceList((prev) => prev.slice(0, -1));
  };

  // ✅ Save and show toast
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
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title: </label>
                  <input
                    name="title"
                    value={item?.title || ""}
                    onChange={(event) => handleChange(index, event)}
                    className="border p-2 w-full"
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name: </label>
                  <input
                    name="companyName"
                    value={item?.companyName || ""}
                    onChange={(event) => handleChange(index, event)}
                    className="border p-2 w-full"
                  />
                </div>
                <div>
                  <label className="text-xs">Location: </label>
                  <input
                    name="location"
                    value={item?.location || ""}
                    onChange={(event) => handleChange(index, event)}
                    className="border p-2 w-full"
                  />
                </div>
                <div>
                  <label className="text-xs">State: </label>
                  <input
                    name="state"
                    value={item?.state || ""}
                    onChange={(event) => handleChange(index, event)}
                    className="border p-2 w-full"
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date: </label>
                  <input
                    type="date"
                    name="startDate"
                    value={item?.startDate || ""}
                    onChange={(event) => handleChange(index, event)}
                    className="border p-2 w-full"
                  />
                </div>
                <div>
                  <label className="text-xs">End Date: </label>
                  <input
                    type="date"
                    name="endDate"
                    value={item?.endDate || ""}
                    onChange={(event) => handleChange(index, event)}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs">Responsibilities: </label>
                  <button type="button" onClick={() => GenerateSummeryFromAI(index)} className="bg-blue-600 text-primary flex gap-2 size=sm float-end">
                    <Brain className="h-4 w-4" /> Generate from AI
                  </button>
                  <textarea
                    className="w-full mt-2 p-2 border rounded resize-none min-h-[80px] focus:ring-2 focus:ring-blue-500"
                    value={item.responsibilities || ""}
                    onChange={(event) => handleWorkSummaryChange(index, event)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={AddNewExperience}>+ Add Experience</button>
        <button onClick={RemoveExperience}>- Remove</button>
        <button className="bg-green-500" onClick={onSave}>Save</button>
      </div>
      {showToast && <Toast />}
    </div>
  );
}

export default Experience;
