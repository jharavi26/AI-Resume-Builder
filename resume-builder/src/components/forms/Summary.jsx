import React, { useContext, useState , useEffect } from 'react'
import { ResumeInfoContext } from '../../context/ResumeInfoContext'
import { Brain } from 'lucide-react'
import { AIChatSession } from '../../service/AiModel'

const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"

const Toast = () => {
  return (
    <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg shadow-lg">
      Details Updated
    </div>
  );
};


function Summary({enableNext}) {
  const {resumeInfo , setResumeInfo} = useContext(ResumeInfoContext);

  const [summery , setSummery] = useState();
  const [aiGeneratedSummeryList , setAiGeneratedSummeryList] = useState();
  const [showToast , setShowToast]= useState(false)

  useEffect(()=>{
    summery&&setResumeInfo({
        ...resumeInfo,
        summery:summery
    })
},[summery])

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(timer);
  }, [showToast]);

  const GenerateSummeryFromAI = async () => {
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
    console.log("Final Prompt:", PROMPT);
  
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      
      // Ensure response is awaited
      let responseText = await result.response.text(); // Change const → let
      console.log("Raw AI Response:", responseText);
  
      // Remove Markdown formatting
      responseText = responseText.replace(/```json|```/g, "").trim();
  
      // Attempt to parse as JSON
      const jsonResponse = JSON.parse(responseText);
      console.log("Parsed JSON:", jsonResponse);
  
      setAiGeneratedSummeryList(jsonResponse);
    } catch (error) {
      console.error("Error in AI response processing:", error);
    }
  };
  
   

const onSave = (e)=>{
  e.preventDefault();
  enableNext(true);
  setShowToast(true);
}

  return (
    <div>

<div className='p-5 shadow-lg rounded-lg border-t-primary border-t-2 mt-10'>
        <h2 className='font-bold text-lg'>Summery</h2>
        <p>Add Summery for your job title</p>

      <div className="flex flex-col items-center justify-center">
      {showToast && <Toast />}
      </div>

        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summery</label>
                <button onClick={()=>GenerateSummeryFromAI()} 
                 className="bg-blue-600 text-primary flex gap-2 size=sm"> 
                <Brain className='h-4 w-4' />  Generate from AI</button>
            </div>
            <textarea className="w-full mt-5 resize-none overflow-hidden min-h-[50px] p-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required
            value={summery} 
                defaultValue={summery?summery:resumeInfo?.summery}  
                onChange={(e) => {
                  setSummery(e.target.value);
                  e.target.style.height = "auto"; // Reset height first
                  e.target.style.height = `${e.target.scrollHeight}px`; // Adjust to content
                }}
            />
            <div className='mt-2 flex justify-end '>
            <button type="submit" className='bg-green-500'>
                    Save
                    </button>
            </div>
        </form>
        </div>

        
       {/* {aiGeneratedSummeryList&& <div className='my-5'>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            {aiGeneratedSummeryList?.map((item,index)=>(
                <div key={index} 
                onClick={()=>setSummery(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))}
        </div>} */}
      
    </div>
  )
}

export default Summary
