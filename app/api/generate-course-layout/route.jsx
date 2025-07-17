import { currentUser } from '@clerk/nextjs/server';
import {
  GoogleGenAI,
} from '@google/genai';
import { NextResponse } from 'next/server';
import { db } from '../../../config/db';
import { coursesTable, usersTable } from '../../../config/schema';
import { eq } from 'drizzle-orm';


const PROMPT=`Genrate Learning Course depends on following
details. In which Make sure to add Course Name,
Description, Course Banner Image Prompt (Create a
modern, flat-style 2D digital illustration representing
user Topic. Include UI/UX elements such as mockup
screens, text blocks, icons, buttons, and creative
workspace tools. Add symbolic elements related to
user Course, like stioky notes, design components,
and visual aids. Use a vibrant color palette (blues,
purples, oranges) with a clean, professional look. The
illustration should feel creative, tech-savvy, and
educational, ideal for visualizing concepts in user
Course) for Course Banner in 3d format Chapter
Name, , Topic under each chapters , Duration for
each chapters etc, in JSON format only
Schema:
{
"course": {
“name”: "string",
“description”: "string",
"category": "string",
"level": "string",
“includeVideo": "boolean",
"noOfChapters": “number”,
*bannerimagePrompt": “string”,
"chapters": [
d “chapterName": "string",
“duration”: "string",
"topics": [
"string"
1
}
]
}
}
User Input:`

export async function POST(req) {
    const {courseId,...formData} = await req.json();
    const user=await currentUser();
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });
    const tools = [
        {
        googleSearch: {
        }
        },
    ];
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
            text: PROMPT + JSON.stringify(formData),
            },
        ],
        },
    ];

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });
    console.log(response.candidates[0].content.parts[0].text);
    const RawResp= response?.candidates[0]?.content?.parts[0]?.text;
    const RawJson=RawResp.replace('```json','').replace('```','');
    const JSONResp=JSON.parse(RawJson);

    //infomation save to database
    try {
        // Get the user ID from the users table
        const users = await db.select().from(usersTable).where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));
        
        if (users.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const result = await db.insert(coursesTable).values({
            userId: users[0].id,
            courseName: formData.courseName,
            courseDescription: formData.courseDescription,
            noOfChapters: parseInt(formData.noOfChapters),
            includeVideo: formData.includeVideo,
            difficultyLevel: formData.difficultyLevel,
            courseJson: JSONResp,
            userEmail: user.primaryEmailAddress.emailAddress
        }).returning();

        console.log("Database insert result:", result);
        return NextResponse.json({ success: true, courseId: result[0].id, course: result[0] });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to save course", details: error.message }, { status: 500 });
    }
    }