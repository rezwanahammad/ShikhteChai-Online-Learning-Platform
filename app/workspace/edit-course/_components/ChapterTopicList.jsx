import React from 'react'
import { Gift } from 'lucide-react';

    const ChapterTopicList = ({course}) => {
        const courseLayout = course?.courseJson?.course;
    return (
        <div>
        <h2 className="text-2xl font-bold text-center mt-5">Chapters & Topics</h2>
        

    <div className="flex flex-col items-center justify-center mt-10">
    {courseLayout?.chapters?.map((chapter, index) => (
        <div key={index} className="flex flex-col items-center">
        <div className="p-4 border shadow rounded-xl bg-primary text-white">
            <h2 className="text-center">Chapter {index + 1}</h2>
            <h2 className="font-bold text-lg text-center">{chapter.chapterName}</h2>
            <h2 className="text-xs flex justify-between gap-16">
            <span>Duration: {chapter?.duration}</span>
            <span>No Of Topics: {chapter?.topics?.length}</span>
            </h2>
        </div>

        <div>
            {chapter?.topics?.map((topic, topicIndex) => (
            <div className="flex flex-col items-center" key={topicIndex}>
                <div className="h-10 bg-gray-300 w-1"></div>

                <div className="flex items-center gap-5">
                <span
                    className={`${
                    topicIndex % 2 === 0 ? 'text-transparent' : ''
                    } max-w-xs`}
                >
                    {topic}
                </span>

                <h2 className="text-center rounded-full bg-gray-300 px-6 text-gray-500 p-4">
                    {topicIndex + 1}
                </h2>

                <span
                    className={`${
                    topicIndex % 2 !== 0 ? 'text-transparent' : ''
                    } max-w-xs`}
                >
                    {topic}
                </span>
                </div>

                {topicIndex === chapter?.topics?.length - 1 && (
                <>
                    <div className="h-10 bg-gray-300 w-1"></div>
                    <div className="flex items-center gap-5">
                    <Gift className="text-center rounded-full bg-gray-300 h-14 w-14 text-gray-500 p-4" />
                    </div>
                    <div className="h-10 bg-gray-300 w-1"></div>
                </>
                )}
            </div>
            ))}
        </div>

        <div className="p-4 border shadow rounded-xl bg-green-600 text-white mb-4">
            <h2>Finish</h2>
        </div>
        </div>
    ))}
    </div>

        </div>
    )
    }

    export default ChapterTopicList
