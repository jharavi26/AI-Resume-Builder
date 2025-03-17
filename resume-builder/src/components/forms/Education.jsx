import React, { useContext, useState , useEffect } from 'react'
import { ResumeInfoContext } from '../../context/ResumeInfoContext'

const Toast = () => {
  return (
    <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg shadow-lg ">
      Details Updated
    </div>
  );
};

function Education() {

  const {resumeInfo ,  setResumeInfo} = useContext(ResumeInfoContext);
  const [educationalList , setEducationalList] = useState([
    {
      universityName:'',
      degree:'',
      startDate:'',
      endDate:'',
      description:''
    }
  ])
  const [showToast , setShowToast] = useState(false);


  useEffect(()=>{
    resumeInfo&&setEducationalList(resumeInfo?.education)
  },[])

  const handleChange=(event,index)=>{
    const newEntries=educationalList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setEducationalList(newEntries);
  }

  const AddNewEducation=()=>{
    setEducationalList([...educationalList,
      {
        universityName:'',
        degree:'',
        startDate:'',
        endDate:'',
        description:''
      }
    ])
  }

  const RemoveEducation=()=>{
    setEducationalList(educationalList=>educationalList.slice(0,-1))

  }

  const handleDescriptionChange = (index, event) => {
    const { value } = event.target;

    setEducationalList((prevEducation) => {
      const updatedEducation = [...prevEducation];
      updatedEducation[index] = {
        ...updatedEducation[index],
        description: value, // Update only workSummery
      };
      return updatedEducation;
    });
  };

  const onSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

 

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      education:educationalList
    })
  },[educationalList])

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Education</h2>
    <p>Add Your educational details</p>

    <div>
      {educationalList.map((item,index)=>(
        <div key ={index}> 
          <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
            <div className='col-span-2'>
              <label>University Name :- </label>
              <input name="universityName" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.university}
              />
            </div>
            <div>
              <label>Degree :-</label>
              <input name="degree" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.degree} />
            </div>
            <div>
              <label>Start Date :-</label>
              <input type="date" name="startDate" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.startDate} />
            </div>
            <div>
              <label>End Date :-</label>
              <input type="date" name="endDate" 
              onChange={(e)=>handleChange(e,index)}
              defaultValue={item?.endDate} />
            </div>
            <div className='col-span-2'>
              <label>Description :-</label>
              <textarea
                    className="w-full mt-2 p-2 border rounded resize-none min-h-[80px] focus:ring-2 focus:ring-blue-500"
                    name="workSummery"
                    value={item?.description|| ""}
                    onChange={(event) => handleDescriptionChange(index, event)}
                  />
             </div>
          </div>
       
        </div>
      ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <button  onClick={AddNewEducation} className="text-primary"> + Add More Education</button>
            <button onClick={RemoveEducation} className="text-primary bg-pink-600"> - Remove</button>

            </div>
            <button className='bg-green-500' onClick={onSave}>
            Save
            </button>
        
        </div>
        {showToast && <Toast/>}
    </div>
   
  )
}

export default Education
