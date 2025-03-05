import React, { useContext , useState , useEffect } from 'react'
import { ResumeInfoContext } from '../../context/ResumeInfoContext'
import StarRating from './StarRating';

const Toast = () => {
  return (
    <div className="fixed bottom-5 right-5 bg-black text-white p-4 rounded-lg shadow-lg ">
      Details Updated
    </div>
  );
};


function Skills() {

  const {resumeInfo , setResumeInfo , setShowPreview} = useContext(ResumeInfoContext)

  const [skillsList,setSkillsList]=useState([{
    name:'',
    rating:0
}])
const [showToast , setShowToast] = useState(false);

useEffect(()=>{
  resumeInfo&&setSkillsList(resumeInfo?.skills)
},[])

const handleChange=(index,name,value)=>{
  const newEntries=skillsList.slice();

  newEntries[index][name]=value;
  setSkillsList(newEntries);
}

const AddNewSkills=()=>{
  setSkillsList([...skillsList,{
      name:'',
  rating:0 
  }])
}
const RemoveSkills=()=>{
  setSkillsList(skillsList=>skillsList.slice(0,-1))
}

const onSave = () => {
  setShowToast(true);
  setTimeout(() => setShowToast(false), 2000);
  setShowPreview(true);

};

useEffect(()=>{
  setResumeInfo({
      ...resumeInfo,
      skills:skillsList
  })
},[skillsList])

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Skills</h2>
    <p>Add Your top professional key skills</p>

    <div>
        {skillsList.map((item,index)=>(
            <div key = {index} className='flex justify-between mb-2 border rounded-lg p-3 '>
                <div>
                    <label className='text-xs'>Name</label>
                    <input className="w-full"
                    defaultValue={item.name}
                    onChange={(e)=>handleChange(index,'name',e.target.value)} />
                </div>
                <StarRating index={index} item={item} handleChange={handleChange} />
               
            </div>
        ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <button onClick={AddNewSkills} className="text-primary"> + Add More Skill</button>
            <button  onClick={RemoveSkills} className="text-primary"> - Remove</button>

            </div>
            <button onClick={onSave} className='bg-green-500'>
            Save
            </button>
        </div>
        {showToast && <Toast />}
    </div>
  )
}

export default Skills
