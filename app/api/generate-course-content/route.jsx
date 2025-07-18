import { NextResponse } from "next/server";
import { GoogleGenAI } from '@google/genai';
import axios from "axios";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const tools = [
    {
    googleSearch: {
    }
    },
];


const PROMPT = `Generate detailed HTML content for each topic in the given chapter. 
Return the response in valid JSON format with the following schema:

{
  "chapterName": "string",
  "topics": [
    {
      "topic": "string",
      "content": "HTML content as string"
    }
  ]
}

User Input:`;


export async function POST(req) {
    try {
        const {courseJson, courseTitle, courseId} = await req.json();
        
        console.log("Received request:", {courseJson, courseTitle, courseId});
        
        if (!courseJson?.chapters || !Array.isArray(courseJson.chapters)) {
            return NextResponse.json(
                { error: "Invalid course data - chapters not found" }, 
                { status: 400 }
            );
        }
        
        const promises = courseJson.chapters.map(async (chapter, index) => {
            try {
                const config = {
                    thinkingConfig: {
                        thinkingBudget: -1,
                    },
                    tools,
                    responseMimeType: 'text/plain',
                };
                
                const model = 'gemini-2.5-pro';
                const contents = [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: PROMPT + JSON.stringify(chapter),
                            },
                        ],
                    },
                ];

                console.log(`Generating content for chapter ${index + 1}:`, chapter.chapterName);
                
                const response = await ai.models.generateContent({
                    model,
                    config,
                    contents,
                });
                
                if (!response?.candidates?.[0]?.content?.parts?.[0]?.text) {
                    console.error(`No response received for chapter ${index + 1}`);
                    return {
                        chapterName: chapter.chapterName,
                        topics: [],
                        error: "No content generated"
                    };
                }
                
                console.log(`Raw response for chapter ${index + 1}:`, response.candidates[0].content.parts[0].text);
                
                const RawResp = response.candidates[0].content.parts[0].text;
                const RawJson = RawResp.replace(/```json/g, '').replace(/```/g, '').trim();
                
                let JSONResponse;
                try {
                    JSONResponse = JSON.parse(RawJson);
                } catch (parseError) {
                    console.error(`JSON parse error for chapter ${index + 1}:`, parseError);
                    console.error("Raw JSON:", RawJson);
                    return {
                        chapterName: chapter.chapterName,
                        topics: [],
                        error: "Failed to parse AI response"
                    };
                }


                //GET YOUTUBE VIDEOS

                const youtubeData = await GetYoutubeVideo(chapter.chapterName);
                return {
                    youtubeVideo: youtubeData,
                    courseData: JSONResponse
                };
                
            } catch (chapterError) {
                console.error(`Error processing chapter ${index + 1}:`, chapterError);
                return {
                    chapterName: chapter.chapterName,
                    topics: [],
                    error: chapterError.message
                };
            }
        });

        const CourseContent = await Promise.all(promises);  

        return NextResponse.json({
            courseName: courseTitle,
            CourseContent: CourseContent
        });
        
    } catch (error) {
        console.error("Error in generate-course-content API:", error);
        return NextResponse.json(
            { error: "Internal server error: " + error.message }, 
            { status: 500 }
        );
    }
}


const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const GetYoutubeVideo=async(topic)=>{
    try {
        const params = {
            part: 'snippet',
            q: topic,
            maxResults: 4,  // Fixed typo: was maxResult
            type: 'video',
            key: process.env.YOUTUBE_API_KEY
        }

        if (!process.env.YOUTUBE_API_KEY) {
            console.log("YouTube API key not found, returning empty array");
            return [];
        }

        const resp = await axios.get(YOUTUBE_BASE_URL, { params });
        const youtubeVideoListResp = resp.data.items;
        const youtubeVideoList = [];
        youtubeVideoListResp.forEach(item => {
            const data={
                videoId: item?.id?.videoId,
                title: item?.snippet?.title,
            }
            youtubeVideoList.push(data);
        });
        console.log("YouTube videos found:", youtubeVideoList);
        return youtubeVideoList;
    } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        return [];
    }
}