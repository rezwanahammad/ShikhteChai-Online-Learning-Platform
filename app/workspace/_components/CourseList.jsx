"use client"

import { Button } from '../../../@/components/ui/button'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useState } from 'react'
import AddNewCourseDialog from './AddNewCourseDialog'
import axios, { Axios } from 'axios'
import { useUser } from '@clerk/nextjs'
import CourseCard from './CourseCard'

const CourseList = () => {
    const[courseList,setCourseList] = useState([])
    const user=useUser();
    useEffect(()=>{
      user && GetCourseList();
    },[user]) 
    const GetCourseList=async()=>{
      const result = await axios.get('/api/courses');
      console.log(result.data);
      setCourseList(result.data);
    }

  return (
    <div className='mt-10'>
      <h2 className='text-2xl font-bold mb-4'>Course List</h2>

    {courseList?.length==0? 
    <div className='flex items-center p-8 justify-center flex-col border rounded-xl bg-gray-100'>
        <Image src='/onlineeducation.jpg' alt='Education' width={200} height={200} />
        <h2 className='my-2 text-lg font-bold'>You haven't created any courses  yet</h2>
        <AddNewCourseDialog>
        <Button>Create your course</Button>
        </AddNewCourseDialog>
        </div>:
         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
            {courseList.map((course,index) => (
              <CourseCard course={course} key={index} />
            ))}
            </div>
        }


    </div>
  )
}

export default CourseList
