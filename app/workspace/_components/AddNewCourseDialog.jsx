import React, { useState } from 'react'

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

const AddNewCourseDialog = ({children}) => {

  const[formData, setFormData] = useState({
    courseName: '',
    courseDescription: '',
    noOfChapters: '1',
    includeVideo: false,
    difficultyLevel: ''
  });

  const onHandleInputChange = (field,value) => {
    setFormData(prev=>({
      ...prev,
      [field]: value
    }));
    console.log("Form Data: ", formData);
  }

  const onGenerate=()=>{
    console.log(formData);
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
            <Switch onCheckedChange={()=>onHandleInputChange("includeVideo", !formData.includeVideo)} />
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
            <Button onClick={onGenerate}>Generate Course</Button>
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
