import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import moment from "moment/moment";
import getKnex from "@/knex";

export async function GET(request) {
  const base_url = process.env.SHORTLINK_BASE_URL;
  const session = await getServerSession(authOptions);
  const searchParams = new URLSearchParams(request.url);

  const range1 = searchParams.has("range1")
    ? new moment(searchParams.get("range1")).format()
    : new moment().subtract(30, "days").format();

  const range2 = searchParams.has("range2")
    ? new moment(searchParams.get("range2")).format()
    : new moment().format();
  const limit = searchParams.has("limit") ? searchParams.get("limit") : 4;

  const knex = getKnex();
  const total_click = await knex("Click")
    .count("Click.id as total_click")
    .leftJoin("Link", "Link.id", "Click.linkId")
    .where("Link.userId", session.user.id)
    .andWhereBetween("Click.clickedAt", [range1, range2])
    .then((data) => data[0]);

  const top_links = await knex("Link")
    .select({
      short_url: "Link.shortUrl",
      original_url: "Link.originalUrl",
      clicks: knex.raw("COUNT(Click.id)"),
    })
    .leftJoin("Click", "Click.linkId", "Link.id")
    .where("Link.userId", session.user.id)
    .andWhereBetween("Click.clickedAt", [range1, range2])
    .groupBy("Link.id")
    .orderBy("clicks", "desc")
    .limit(limit);
  top_links.map((link) => {
      link.short_url = `${base_url}/${link.short_url}`;
  })
  const data = top_links;

  return NextResponse.json({
    success: true,
    message: "data delivered",
    data: data,
  });
}
