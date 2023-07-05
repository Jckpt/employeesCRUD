import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const users = await prisma.sluzba.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    console.log(json);
    const user = await prisma.sluzba.create({
      data: {
        firstName: json.firstName,
        lastName: json.lastName,
        dateOfBirth: json.dateOfBirth,
        jobTitle: json.jobTitle,
        experience: json.experience,
      }
    });

    return new NextResponse(JSON.stringify(user), { 
     status: 201, 
     headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return new NextResponse("User with email already exists", {
        status: 409,
      });
    }
    return new NextResponse(error.message, { status: 500 });
  }
}