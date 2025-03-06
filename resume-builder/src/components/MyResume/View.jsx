import React, { useState , useEffect } from 'react'
import Header from '../Custom/Header'
import ResumePreview from '../Custom/ResumePreview'
import { ResumeInfoContext } from '../../context/ResumeInfoContext'
import { useParams, useSearchParams } from 'react-router-dom';
import Dummy from '../../data/Dummy';

function View() {
  const [resumeInfo , setResumeInfo] = useState();
  const {resumeId} = useParams();

  useEffect(() => {
    if (resumeId) {
      const storedData = sessionStorage.getItem(resumeId);
      if (storedData) {
        setResumeInfo(JSON.parse(storedData));
        console.log("Loaded from localStorage:", JSON.parse(storedData)); // Debugging
      }
    }
  }, [resumeId]);

  const HandleDownload = () => {
    if (!resumeInfo) {
      alert("Resume is still loading. Please wait!");
      return;
    }
    setTimeout(() => {
      window.print();
    }, 500); // Small delay to ensure content is rendered
  };
  

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
    <div id="no-print">
      <Header />
      <div className="my-10 mx-6 md:mx-16 lg:mx-28">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          🎉 Congrats! Your Ultimate AI-Generated Resume is Ready!
        </h2>
        <p className="text-center text-gray-500 mt-2">
          Now you can download your resume or share the unique URL with your friends and family.
        </p>
  
        {/* Button Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-10">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all" onClick={HandleDownload}>
            📥 Download
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all">
            🔗 Share
          </button>
        </div>
      </div>
    </div>
  
    {/* Resume Preview (outside of #no-print) */}
    <div className="mt-10 flex justify-center">
      {resumeInfo ? (
        <div id="print-area" className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
          <ResumePreview resume={resumeInfo} />
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading resume...</p>
      )}
    </div>
  </ResumeInfoContext.Provider>
  
 )    
}

export default View
