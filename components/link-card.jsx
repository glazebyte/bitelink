import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { CalendarFold, ChartNoAxesColumn, KeySquare, Pencil, QrCode, Share2 } from "lucide-react";
import { Button } from "./ui/button";

function LinkCard() {
  const data = {
    shortLink: "shortlink.com/123456",
    originalLink: " www.example.com",
    clicks: 23,
    date: "2023-01-01",
  };
  return (
    <Card className="sm:min-w-full md:min-w-full lg:min-w-[900px]">
      <CardHeader className="flex flex-row">
        <div className="w-2/3">
          <CardTitle>
            <Link href={data.shortLink}>{data.shortLink}</Link>
          </CardTitle>
          <CardDescription>
            <Link className="text-blue-600" href={data.originalLink}>
              {data.originalLink}
            </Link>
          </CardDescription>
        </div>
        <div className="w-1/3 flex flex-row justify-end space-x-1">
          <Button variant="outline" className="h-8 rounded-md px-2">
            <QrCode />
          </Button>
          <Button variant="outline" className="h-8 rounded-md px-2">
            <Share2 />
            Share
          </Button>
          <Button variant="outline" className="h-8 rounded-md px-2">
            <Pencil />
            Edit
          </Button>
        </div>
      </CardHeader>
      {/* <CardContent className="border-t"></CardContent> */}
      <CardFooter className="py-3 border-t justify-between">
        <div className="flex flex-row gap-2 items-center">
          <CalendarFold className="w-4" color="#737373" />
          <span className="text-sm text-muted-foreground">{data.date}</span>
        </div>
        <div className="flex flex-row gap-2 justify-end">
            <Button variant="outline" className="h-8 rounded-md px-2">
                <ChartNoAxesColumn/>
                Analytics
            </Button>
          <Button variant="outline" className="h-8 rounded-md px-2">
            <KeySquare />
            Add Password
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default LinkCard;
