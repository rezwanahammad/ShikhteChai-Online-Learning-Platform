import { Button } from'../../../@/components/ui/button'
import { Book, PlayCircle } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function CourseCard({course}) {
    const courseJson= course?.courseJson?.course;
  return (
    <div className='shadow rounded-xl'>
      <Image src={course?.bannerImageUrl} alt={course?.title} width={300} height={200} className=' rounded-xl object-cover' />
    <div className='p-3 flex flex-col gap-2'>
        <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
        <p className='line-clamp-3 text-gray-500 text-sm'>{courseJson?.description}</p>
        <div className='flex items-center justify-between'>
            <h2 className='flex items-center gap-2'><Book/> {courseJson?.noOfChapters} chapters</h2>
            {course?.courseContent?<Button size={'sm'}><PlayCircle/>Start Learning</Button>:
            <Link href={'/workspace/edit-course/'+course?.courseId}><Button size={'sm'}>Generate Course</Button></Link>} 
        </div>
    </div>
    </div>
  )
}

export default CourseCard
