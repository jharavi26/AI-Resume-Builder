import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';

const Toast = () => {
  return (
    <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg shadow-lg ">
      Details Updated
    </div>
  );
};

function Experience() {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [showToast, setShowToast] = useState(false);
  const [description , setDescription] = useState()

  // ✅ Ensure experienceList updates when resumeInfo.experience changes
  useEffect(() => {
    resumeInfo?.experience?.length > 0 && setExperienceList(resumeInfo.experience);
    
  }, []);

  // ✅ Sync experienceList with resumeInfo on update
 

 const handleChange=(index,event)=>{
    const newEntries=experienceList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    console.log(newEntries)
    setExperienceList(newEntries);
}

 const AddNewExperience=()=>{
    
    setExperienceList([...experienceList,{
        title:'',
        companyName:'',
        city:'',
        state:'',
        startDate:'',
        endDate:'',
        workSummery:'',
    }])
}

const RemoveExperience=()=>{
    setExperienceList(experinceList=>experinceList.slice(0,-1))
}

useEffect(()=>{
    setResumeInfo({
        ...resumeInfo , 
        experience : experienceList
    });
 } , [experienceList])

  const onSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <input
                    name="title"
                    value={item?.title || ''}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <input
                    name="companyName"
                    value={item?.companyName || ''}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <input
                    name="city"
                    value={item?.city || ''}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <input
                    name="state"
                    value={item?.state || ''}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={item?.startDate || ''}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={item?.endDate || ''}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
                <textarea
                  className="w-full mt-5 resize-none overflow-hidden min-h-[50px] p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                 required
                 value={item.workSummery}
              onChange={(e) => {
              setDescription(e.target.value);
              e.target.style.height = "auto"; // Reset height first
              e.target.style.height = `${e.target.scrollHeight}px`; // Adjust to content
            }}
          />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <button onClick={AddNewExperience} className="text-primary">
              + Add More Experience
            </button>
            <button onClick={RemoveExperience} className="text-primary">
              - Remove
            </button>
          </div>
          <button className='bg-green-500' onClick={onSave}>Save</button>
        </div>
      </div>
      {showToast && <Toast />}
    </div>
  );
}

export default Experience;




