import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import moment from "moment/moment";
import getKnex from "@/knex";

export async function GET(request) {
  const session = await getServerSession(authOptions);
  const { searchParams } = request.nextUrl;
  
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

  const knex = getKnex();
  const clicks_data = await knex("Click")
    .select({
      date: knex.raw("DATE(MIN(Click.clickedAt))"),
      total_click: knex.raw("COUNT(Click.id)"),
      total_use_link: knex.raw("COUNT(IF(Click.useqr=0,1,0))"),
      total_use_qr: knex.raw("COUNT(IF(Click.useqr=1,1,0))"),
    })
    .leftJoin("Link", "Link.id", "Click.linkId")
    .where("Link.userId", session.user.id)
    .andWhereBetween("Click.clickedAt", [range1, range2])
    .groupByRaw("EXTRACT( DAY FROM Click.clickedAt)");

  const unique_clicks = await knex("unique_clicks")
    .select({
      date: knex.raw("DATE(MIN(first_click))"),
      unique_click: knex.raw("count (user)"),
    })
    .from(
      knex("Click")
        .select({
          user: knex.raw("CONCAT(Click.userAgent,'-',Click.ipAddress)"),
          first_click: knex.raw("DATE(MIN(Click.clickedAt))"),
        })
        .leftJoin("Link", "Link.id", "Click.linkId")
        .where("Link.userId", session.user.id)
        .groupBy("user")
        .as("unique_clicks")
    )
    .whereBetween("first_click", [range1, range2])
    .groupByRaw("EXTRACT( DAY FROM first_click)");

  const data = clicks_data.map((item) => {
    const unique =
      unique_clicks.find((click) => click.date.getTime() == item.date.getTime())
        ?.unique_click || 0;
    return {
      ...item,
      unique,
    };
  });

  // console.log(unique_clicks);
  return NextResponse.json({
    success: true,
    message: "data delivered",
    data: data,
  });
}
