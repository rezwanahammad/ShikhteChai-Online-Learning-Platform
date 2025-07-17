import React, { useState } from 'react'
import axios from 'axios'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../@/components/ui/dialog"
import { Input } from '../../../@/components/ui/input'
import { Textarea } from '../../../@/components/ui/textarea'
import { Switch } from '../../../@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select"
import { Button } from "../../../@/components/ui/button"
import { Loader2Icon, Sparkle } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Simple UUID generator that works in browser
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const AddNewCourseDialog = ({children}) => {
  const[loading,setLoading]=useState(false); 
  const[formData, setFormData] = useState({
    courseName: '',
    courseDescription: '',
    noOfChapters: '1',
    includeVideo: false,
    difficultyLevel: ''
  });

  const router=useRouter();

  const onHandleInputChange = (field,value) => {
    setFormData(prev=>({
      ...prev,
      [field]: value
    }));
    console.log("Form Data: ", formData);
  }

  const onGenerate=async()=>{
    console.log(formData);
    const courseId=generateUUID();
    setLoading(true);
    try {
      const result = await axios.post('/api/generate-course-layout', {
        ...formData,
        courseId:courseId
      });
      console.log(result.data);
      setLoading(false);
      
      if (result.data.success) {
        router.push('/workspace/edit-course/' + result.data.courseId);
      } else {
        console.error("Failed to generate course:", result.data.error);
        alert("Failed to generate course. Please try again.");
      }
    } catch (error) {
      console.error("Error generating course:", error);
      setLoading(false);
      alert("An error occurred while generating the course. Please try again.");
    }
  }

  return (
    <div>
      <Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Do you want to create a new course?</DialogTitle>
      <DialogDescription asChild>
        <div className='flex flex-col gap-4 mt-2'>
          <div>
            <label htmlFor="course-name">Course Name</label>
            <Input placeholder="Enter course name" id="course-name" onChange={(e)=>onHandleInputChange("courseName", e.target.value)} />
          </div>

          <div>
            <label htmlFor="course-description">Course Description</label>
            <Textarea placeholder="Enter course description" id="course-description" onChange={(e)=>onHandleInputChange("courseDescription", e.target.value)} />
          </div>

          <div>
            <label htmlFor="no-of-chapters">No of Chapters</label>
            <Input placeholder="Enter no of chapters" id="no-of-chapters" type='number' onChange={(e)=>onHandleInputChange("noOfChapters", e.target.value)} />
          </div>

          <div className='flex items-center gap-2'>
            <label>Include video </label>
            <Switch onCheckedChange={(checked)=>onHandleInputChange("includeVideo", checked)} />
          </div>
          <div>
            <label >Difficulty Level</label>
            <Select onValueChange={(value)=>onHandleInputChange("difficultyLevel", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hard">Hard</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center gap-2 justify-center'>
            <Button onClick={onGenerate}>{loading?<Loader2Icon className="animate-spin" />:<Sparkle/>}Generate Course</Button>
          </div>


        </div>
        
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddNewCourseDialog
