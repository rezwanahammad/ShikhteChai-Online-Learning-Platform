import { usersTable } from "../../../config/schema";
import { NextResponse } from "next/server";
import { db } from "../../../config/db";
import { eq } from "drizzle-orm";


export async function POST(req) {
    const { name, email } = await req.json();

    if (!name || !email) {
        return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (users.length == 0) {
        const result = await db.insert(usersTable).values({
            name,
            email
        }).returning(usersTable);

        console.log(result);
        return NextResponse.json(result[0]);
    }

    return NextResponse.json(users[0]);
}
