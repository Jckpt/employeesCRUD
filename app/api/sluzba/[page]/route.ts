import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { page: string } }) {
    const users = await prisma.sluzba.findMany({
        skip: (parseInt(params.page) - 1) * 5,
        take: 5,
    });
    return NextResponse.json(users);
  }