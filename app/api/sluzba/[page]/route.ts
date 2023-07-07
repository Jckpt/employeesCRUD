import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { page: string } }
) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const searchString = searchParams.get("searchString");
  const where = {
    ...(date && { dateOfBirth: new Date(date) }),
    ...(searchString && {
      OR: [
        { firstName: { contains: searchString } },
        { lastName: { contains: searchString } },
        { jobTitle: { contains: searchString } },
      ],
    }),
  };

  const employees = await prisma.sluzba.findMany({
    skip: (parseInt(params.page) - 1) * 5,
    take: 5,
    where,
  });
  const totalCount = await prisma.sluzba.count({
    where,
  });
  const totalPages = Math.ceil(totalCount / 5);
  return NextResponse.json({ employees, totalPages });
}
