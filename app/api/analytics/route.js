export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const prisma = new PrismaClient();

export async function GET(request) {
  const sesssion = await getServerSession(authOptions);
  const totalLink = await prisma.link.count({
    where: {
      userId: sesssion.user.id,
    },
  })
  const totalclick = await prisma.$queryRaw
  `
    SELECT 
      COUNT(clicks.id) as total_click,
      COUNT(IF(clicks.useqr=0,1,NULL)) as total_use_link,
      COUNT(IF(clicks.useqr=1,1,NULL)) as total_use_qr
    FROM Click clicks
    LEFT JOIN Link links on links.id = clicks.linkId 
    WHERE links.userId = ${sesssion.user.id}
  `;
  const lalala = {...totalclick}
  const mostUserAgent = await prisma.$queryRaw
  `
    SELECT 
      clicks.userAgent,
      count(clicks.userAgent) as total
    FROM Click clicks
    LEFT JOIN Link links on links.id = clicks.linkId 
    WHERE links.userId = ${sesssion.user.id}
    GROUP BY clicks.userAgent
    ORDER BY COUNT(clicks.userAgent) DESC
  `;
  const mostClick = await prisma.$queryRaw
  `
    SELECT 
      links.shortUrl,
      count(links.id) as total
    FROM Click clicks
    LEFT JOIN Link links ON links.id = clicks.linkId 
    WHERE links.userId = ${sesssion.user.id}
    group by links.id
    LIMIT 3;
  `
  mostClick.map((item) => {
    item.shortUrl = `${process.env.SHORTLINK_BASE_URL}/${item.shortUrl}`
  })
  const mostReferrer = await prisma.$queryRaw
  `
    SELECT 
      clicks.referrer,
      count(clicks.referrer) as total
    FROM Click clicks
    LEFT JOIN Link links on links.id = clicks.linkId 
    WHERE links.userId = ${sesssion.user.id}
    GROUP BY clicks.referrer
    ORDER BY COUNT(clicks.referrer) DESC
  `;

  const data = {
    totalLink: totalLink,
    totalclick: totalclick[0],
    mostClick: mostClick,
    mostUserAgent: mostUserAgent,
    mostReferrer: mostReferrer,
  };
  return NextResponse.json(
    {
      success: true,
      message: "data delivered",
      data: data
    },
    {
      status: 200,
    }
  );
}
