import React, { useContext, useState, useEffect } from "react";
import { ResumeInfoContext } from "../../context/ResumeInfoContext";
import { Brain } from "lucide-react";
import { AIChatSession } from "../../service/AiModel";

const prompt = `
  Based on the job title: "{jobTitle}", generate a list of summaries for three experience levels: 
  - Fresher
  - Mid Level
  - Experienced

  Each summary should be 3-4 lines long and returned in the following **strict JSON array format**:

  [
    { "experience_level": "Fresher", "summary": "Your fresher-level summary here." },
    { "experience_level": "Mid Level", "summary": "Your mid-level summary here." },
    { "experience_level": "Experienced", "summary": "Your experienced-level summary here." }
  ]

  Ensure the response is **valid JSON** without additional text.
`;

const Toast = () => {
  return (
    <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg shadow-lg">
      Details Updated
    </div>
  );
};

function Summary({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();

  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, [showToast]);

  const GenerateSummeryFromAI = async () => {
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log("Final Prompt:", PROMPT);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);

      let responseText = await result.response.text(); // Ensure response is awaited
      console.log("Raw AI Response:", responseText); // Debugging log

      // Remove potential Markdown formatting
      responseText = responseText.replace(/```json|```/g, "").trim();

      try {
        const jsonResponse = JSON.parse(responseText); // Try parsing as JSON
        setAiGeneratedSummeryList(jsonResponse);
      } catch (parseError) {
        console.warn("AI response is not valid JSON. Using raw text instead.");

        // If it's not JSON, treat it as plain text and wrap it in an object
        setAiGeneratedSummeryList([{ summary: responseText }]);
      }
    } catch (error) {
      console.error("Error in AI response processing:", error);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    enableNext(true);
    setShowToast(true);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-2 mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>

        <div className="flex flex-col items-center justify-center">
          {showToast && <Toast />}
        </div>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <button
              onClick={() => GenerateSummeryFromAI()}
              className="bg-blue-600 text-primary flex gap-2 size=sm"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </button>
          </div>
          <textarea
            className="w-full mt-5 resize-none overflow-hidden min-h-[50px] p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
            value={resumeInfo.summery}
            onChange={(e) => {
              setSummery(e.target.value);
              e.target.style.height = "auto"; // Reset height first
              e.target.style.height = `${e.target.scrollHeight}px`; // Adjust to content
            }}
          />
          <div className="mt-2 flex justify-end ">
            <button type="submit" className="bg-green-500">
              Save
            </button>
          </div>
        </form>
      </div>

      {aiGeneratedSummeryList && (
        <div className="my-5">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
