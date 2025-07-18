import { NextResponse } from "next/server";
import { GoogleGenAI } from '@google/genai';

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

                return JSONResponse;
                
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