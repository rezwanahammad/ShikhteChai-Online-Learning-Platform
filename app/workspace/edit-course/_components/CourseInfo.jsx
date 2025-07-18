import { Button } from '../../../../@/components/ui/button';
import { Book, Clock, DiffIcon, Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'
import axios from 'axios';

const CourseInfo = ({ course }) => {
    const courseLayout = course ?.courseJson?.course;
    const  [loading, setLoading] = useState(false);
    const GenerateCourseContent=async()=>{

        setLoading(true);
        try{
            const result = await axios.post('/api/generate-course-content', {
                courseJson: courseLayout,
                courseTitle: courseLayout?.name,
                courseId: course?.id
            });
            console.log(result.data);
            setLoading(false);
            alert("Course content generated successfully!");
        }
        catch(error){
            console.error("Error generating course content:", error);
            setLoading(false);
            alert("An error occurred while generating the course content. Please try again.");
        }
        
    }

  return (
  <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md mx-auto">
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-800">{courseLayout?.name}</h2>
    <p className="text-gray-600 line-clamp-2">{courseLayout?.description}</p>

    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <Clock className="w-6 h-6 text-blue-500" />
        <section>
          <h2 className="text-sm text-gray-500">Duration</h2>
          <h2 className="text-base font-semibold text-gray-800">2.5 hours</h2>
        </section>
      </div>

      <div className="flex items-center space-x-4">
        <Book className="w-6 h-6 text-green-500" />
        <section>
          <h2 className="text-sm text-gray-500">Chapters</h2>
          <h2 className="text-base font-semibold text-gray-800">{courseLayout?.noOfChapters}</h2>
        </section>
      </div>

      <div className="flex items-center space-x-4">
        <DiffIcon className="w-6 h-6 text-red-500" />
        <section>
          <h2 className="text-sm text-gray-500">Difficulty</h2>
          <h2 className="text-base font-semibold text-gray-800">{courseLayout?.level}</h2>
        </section>
      </div>
    </div>
  </div>
  {course?.bannerImageUrl && (
    <Image
      src={course.bannerImageUrl}
      alt={'bannerImage'}
      width={500}
      height={300}
      className="rounded-lg mt-4"
    />
  )}

<div className="mt-6 flex justify-center">
        <Button onClick={GenerateCourseContent} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin mr-2" /> : null}
            {loading ? 'Generating...' : 'Generate Course Content'}
        </Button>
      </div>

</div>

  )
}

export default CourseInfo
