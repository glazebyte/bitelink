import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET() {
  const links = await prisma.link.findMany()
  return NextResponse.json({
    success : true,
    messeage : "data delivered",
    data : links
  },{
    status : 200
  })
}


/**
 * POST: Create a new link
 */
export async function POST(request) {
  const formData = await request.formData();
  const url = formData.get("url");
  const shortlink = formData.get("shortlink");

  if (!url || !shortlink) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing required fields: url and shortlink",
      },
      { status: 400 }
    );
  }

  try {
    const newLink = await prisma.link.create({
      data: { url, shortlink },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Link created successfully",
        data: newLink,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error creating link",
        error: error.message,
      },
      { status: 500 }
    );
  }
}