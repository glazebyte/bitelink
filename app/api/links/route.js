export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  const sesssion = await getServerSession(authOptions);
  const links = await prisma.link.findMany({
    where: {
      userId: sesssion.user.id,
    },
  });
  const linksdata = links.map((link) => ({
    id: link.id,
    originalUrl: link.originalUrl,
    shortUrl: `${process.env.SHORTLINK_BASE_URL}/${link.shortUrl}`,
    isPrivate: link.isPrivate,
    createdAt: link.createdAt,
    updatedAt: link.updatedAt,
  }));
  return NextResponse.json(
    {
      success: true,
      message: "data delivered",
      data: linksdata
    },
    {
      status: 200,
    }
  );
}

/**
 * POST: Create a new link
 */
export async function POST(request) {
  const sesssion = await getServerSession();
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
