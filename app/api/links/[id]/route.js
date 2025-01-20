import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const id = parseInt(params.id, 10);

  const linkdata = await prisma.link.findUnique({
    where: {
      id,
    },
  });

  if (!linkdata) {
    return NextResponse.json(
      {
        success: false,
        message: "Link not found",
        data: null,
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message: "Link retrieved successfully",
      data: linkdata,
    },
    { status: 200 }
  );
}

/**
 * PUT: Update an existing link by ID
 */
export async function PUT(request, { params }) {
  const id = parseInt(params.id, 10);
  const body = await request.json();
  const { url, shortlink } = body;

  try {
    const updatedLink = await prisma.link.update({
      where: { id },
      data: { url, shortlink },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Link updated successfully",
        data: updatedLink,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error updating link",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Remove a link by ID
 */
export async function DELETE(request, { params }) {
  const id = parseInt(params.id, 10);

  try {
    await prisma.link.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Link deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting link",
        error: error.message,
      },
      { status: 500 }
    );
  }
}