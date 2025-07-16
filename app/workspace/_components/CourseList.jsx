"use client"

import { Button } from '../../../@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'

const CourseList = () => {
    const[courseList,setCourseList] = useState([])
  return (
    <div className='mt-10'>
      <h2 className='text-2xl font-bold mb-4'>Available Courses</h2>

    {courseList?.length==0? 
    <div className='flex items-center p-8 justify-center flex-col border rounded-xl bg-gray-100'>
        <Image src='/onlineeducation.jpg' alt='Education' width={200} height={200} />
        <h2 className='my-2 text-lg font-bold'>You haven't created any courses  yet</h2>

        <Button>Create your course</Button>
        </div>:
         <div>
            List of courses will be displayed here.
            </div>
        }


    </div>
  )
}

export default CourseList
