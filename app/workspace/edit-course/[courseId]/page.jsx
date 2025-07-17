"use client"

import { useParams } from 'next/navigation';
import React from 'react'

function EditCourse () {
    const {courseId}= useParams();
    console.log(courseId);
  return (
    <div>
       
    </div>
  )
}

export default EditCourse 
