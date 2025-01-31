import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import getKnex from "@/knex";

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const prisma = new PrismaClient();

export async function GET(request) {
  const session = await getServerSession(authOptions);
  const knex = getKnex();

  const links_data = await knex("Click")
    .count({
      total_click: "Click.id",
      total_use_link: knex.raw("IF(Click.useqr=0,1,NULL)"),
      total_use_qr: knex.raw("IF(Click.useqr=1,1,NULL)"),
    })
    .leftJoin("Link", "Link.id", "Click.linkId")
    .where("Link.userId", session.user.id)
    .then((data) => data[0]);

  const top_referrer = await knex("Click")
    .select({
      url: "Click.referrer",
      clicks: knex.raw("COUNT(Click.id)"),
    })
    .leftJoin("Link", "Link.id", "Click.linkId")
    .where("Link.userId", session.user.id)
    .groupBy("Click.referrer")
    .orderBy("clicks", "desc")
    .limit(1)
    .then((data) => data[0]);

  const unique_user = await knex("Click")
    .select({
      unique_user: knex.raw("CONCAT(Click.userAgent,'-',Click.ipAddress)"),
    })
    .leftJoin("Link", "Link.id", "Click.linkId")
    .where("Link.userId", session.user.id)
    .groupBy("unique_user");

  top_referrer.url = top_referrer.url.replace("https://", "");

  const percentage =
    (Number(top_referrer.clicks) / Number(links_data.total_click)) * 100;

  return NextResponse.json({
    success: true,
    message: "data delivered",
    data: {
      ...links_data,
      unique_user: unique_user.length,
      top_referrer: {
        ...top_referrer,
        percentage,
      },
    },
  });
}
