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
  const limit = searchParams.has("limit") ? searchParams.get("limit") : 3;

  const knex = getKnex();
  const total_click = await knex("Click")
    .count("Click.id as total_click")
    .leftJoin("Link", "Link.id", "Click.linkId")
    .where("Link.userId", session.user.id)
    .andWhereBetween("Click.clickedAt", [range1, range2])
    .then((data) => data[0]);

  const refferers_data = await knex("Click")
    .select({
      name: "Click.referrer",
      clicks: knex.raw("COUNT(Click.id)"),
    })
    .leftJoin("Link", "Link.id", "Click.linkId")
    .where("Link.userId", session.user.id)
    .andWhereBetween("Click.clickedAt", [range1, range2])
    .groupBy("Click.referrer")
    .orderBy("clicks", "desc")
    .limit(limit);

  refferers_data.map((item) => {
    item.pertencage = ((item.clicks / total_click.total_click) * 100).toFixed(
      2
    );
    item.name = item.name.replace("https://", "");
  });

  const data = refferers_data;

  // console.log(unique_clicks);
  return NextResponse.json({
    success: true,
    message: "data delivered",
    data: data,
  });
}
