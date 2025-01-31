import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

const prisma = new PrismaClient();

export async function GET(request) {
  const sesssion = await getServerSession(authOptions);

  const links_data = await prisma.$queryRaw
  `
    SELECT 
      COUNT(clicks.id) as total_click,
      COUNT(IF(clicks.useqr=0,1,NULL)) as total_use_link,
      COUNT(IF(clicks.useqr=1,1,NULL)) as total_use_qr
    FROM Click clicks
    LEFT JOIN Link links on links.id = clicks.linkId 
    WHERE links.userId = ${sesssion.user.id}
  `.then((data) => data[0]);

  const top_ref_data = await prisma.$queryRaw
  `
    SELECT 
        clicks.referrer as top_referrer,
        count(clicks.id) as top_referrer_click
    FROM Click clicks
    LEFT JOIN Link links on links.id = clicks.linkId 
    WHERE links.userId = ${sesssion.user.id}
    GROUP BY clicks.referrer 
    ORDER BY COUNT(clicks.id) desc
    LIMIT 1;
  `.then((data) => data[0]);
  const unique_user = await prisma.$queryRaw
  `
    SELECT 
        COUNT(DISTINCT (CONCAT(clicks.userAgent,',',clicks.ipAddress))) as unique_user
    FROM Click clicks
    LEFT JOIN Link links on links.id = clicks.linkId 
    WHERE links.userId = ${sesssion.user.id}
  `.then((data) => data[0]);

  top_ref_data.top_referrer = top_ref_data.top_referrer.replace('https://','');

  const percentage = Number(top_ref_data.top_referrer_click) / Number(links_data.total_click ) * 100;

  return NextResponse.json({
    success: true,
    message: "data delivered",
    data: {
      ...links_data,
      ...unique_user,
      ...top_ref_data,
      percentage
    },
  });
}
