import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";




export async function POST(req) {
    const {courseId} = await req.json();
    const user= await currentUser();


    //if course is already enrolled, return the course details
    const enrollCourses= await db.select().from(enrollCourseTable)
    .where(and(eq(enrollCourseTable.courseId, courseId)),
    eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress));

    if(enrollCourses?.length == 0)
    {
        const result = await db.insert(enrollCourseTable).values({
            courseId: courseId,
            userEmail: user?.primaryEmailAddress?.emailAddress,
        }).returning(enrollCourseTable);

        return NextResponse.json(result);
    }

    return NextResponse.json({'resp:':'You are already enrolled in this course'});

}