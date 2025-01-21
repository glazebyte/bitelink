"use client";
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
import {
  CalendarFold,
  ChartNoAxesColumn,
  KeySquare,
  Pencil,
  QrCode,
  Share2,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import QRCode from "react-qr-code";

function LinkCard({ data }) {
  data.createdAt = new Date(data.createdAt).toDateString();
  data.updatedAt = new Date(data.updatedAt).toDateString();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.shortUrl);
  }
  return (
    <Card className="sm:min-w-full md:min-w-full lg:min-w-[900px]">
      <CardHeader className="flex flex-row">
        <div className="w-2/3">
          <CardTitle>
            <Link href={data.shortUrl}>{data.shortUrl}</Link>
          </CardTitle>
          <CardDescription>
            <Link className="text-blue-600" href={data.originalUrl}>
              {data.originalUrl}
            </Link>
          </CardDescription>
        </div>
        <div className="w-1/3 flex flex-row justify-end space-x-1">
          <QrModal url={data.originalUrl} />
          <Button variant="outline" className="h-8 rounded-md px-2" onClick={copyToClipboard}>
            <Share2 />
            Share
          </Button>
          <LinkEditor/>
        </div>
      </CardHeader>
      <CardFooter className="py-3 border-t justify-between">
        <div className="flex flex-row gap-2 items-center">
          <CalendarFold className="w-4" color="#737373" />
          <span className="text-sm text-muted-foreground">
            {data.createdAt}
          </span>
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <Button variant="outline" className="h-8 rounded-md px-2">
            <ChartNoAxesColumn />
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

function QrModal({ url }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 rounded-md px-2">
          <QrCode />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">QR Code</DialogTitle>
          <DialogDescription className="flex justify-center py-8">
            <QRCode value={url}/>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function LinkEditor() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 rounded-md px-2">
          <Pencil />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Edit Link</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Original URL
                </label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  placeholder="https://example.com"
                  className="border rounded-md px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Short URL
                </label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  placeholder="https://example.com"
                  className="border rounded-md px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Secret Key
                </label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  placeholder="https://example.com"
                  className="border rounded-md px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default LinkCard;
