import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import getKnex from "@/knex";
import moment from "moment/moment";

export async function GET(request) {
  const { searchParams } = request.nextUrl;
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const range1 = searchParams.has("range1")
    ? new moment(searchParams.get("range1")).format()
    : new moment().subtract(30, "days").format();

  const range2 = searchParams.has("range2")
    ? new moment(searchParams.get("range2")).format()
    : new moment().format();

  const limit = searchParams.has("limit")
    ? parseInt(searchParams.get("limit"), 10) || 4
    : 4;

  const knex = getKnex();
  const total_click = await knex("Click")
    .count("Click.id as total_click")
    .leftJoin("Link", "Link.id", "Click.linkId")
    .where("Link.userId", session.user.id)
    .andWhereBetween("Click.clickedAt", [range1, range2])
    .first();

  const devices_data = await knex("Click")
    .select({
      name: knex.raw(`
        CASE 
            WHEN useragent REGEXP 'Android' THEN 'Android'
            WHEN useragent REGEXP 'iPhone|iPad' THEN 'iOS'
            WHEN useragent REGEXP 'Windows' THEN 'Windows'
            WHEN useragent REGEXP 'Macintosh' THEN 'Mac'
            WHEN useragent REGEXP 'Linux' THEN 'Linux'
            ELSE 'Other'
        END`),
      clicks: knex.raw("COUNT(Click.id)"),
    })
    .leftJoin("Link", "Link.id", "Click.linkId")
    .where("Link.userId", session.user.id)
    .andWhereBetween("Click.clickedAt", [range1, range2])
    .groupBy("name")
    .orderBy("clicks", "desc")
    .limit(limit);

  devices_data.forEach((item) => {
    item.percentage = ((item.clicks / total_click.total_click) * 100).toFixed(
      2
    );
  });

  return NextResponse.json({
    success: true,
    message: "data delivered",
    data: {
      total_click: total_click.total_click,
      devices: devices_data,
    },
  });
}
