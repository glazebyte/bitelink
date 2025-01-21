"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LinkIcon,
  MousePointerClick,
  QrCode,
  Percent,
  Globe,
  Clock,
  TrendingUp,
  Globe2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Page() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const [overviewData, setOverviewData] = useState(null);
  const [isLoading, setloading] = useState(true);
  // const [error, seterror] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseurl}/api/analytics`);
      const data = await response.json();
      // const data = {"success":true,"message":"data delivered","data":{"totalLink":5,"totalclick":[{"total_click":5,"total_use_link":2,"total_use_qr":3}],"mostClick":[{"shortUrl":"s.glaze.id/ex1","total":4},{"shortUrl":"s.glaze.id/ex2","total":2},{"shortUrl":"s.glaze.id/ex3","total":4}],"mostUserAgent":[{"userAgent":"Mozilla/5.0","total":4},{"userAgent":"\tChrome 131.0.0, Windows","total":1}],"mostReferrer":[{"referrer":"https://example.com","total":2},{"referrer":"https://google.com","total":1},{"referrer":"https://bing.com","total":1},{"referrer":"https://yahoo.com","total":1}]}}
      console.log(data.data);
      setOverviewData(data.data || []);
    } catch (error) {
      seterror(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
      <div className="flex flex-col py-2 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, User!
        </h2>
        {isLoading ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Skeleton className="lg:h-[120px] bg-stone-200" />
              <Skeleton className="lg:h-[120px] bg-stone-200" />
              <Skeleton className="lg:h-[120px] bg-stone-200" />
              <Skeleton className="lg:h-[120px] bg-stone-200" />
            </div>
            <div className="flex flex-row gap-4">
              <Skeleton className="basis-2/3 lg:h-[300px] bg-stone-200" />
              <Skeleton className="basis-1/3 lg:h-[300px] bg-stone-200" />
            </div>
            <div className="flex flex-row gap-4">
              <Skeleton className="basis-2/3 lg:h-[300px] bg-stone-200" />
              <Skeleton className="basis-1/3 lg:h-[300px] bg-stone-200" />
            </div>
          </>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <TotalLinksCard data={overviewData.totalLink} />
              <TotalClicksCard data={overviewData.totalclick.total_click} />
              <TotalQrCodesCard data={overviewData.totalclick.total_use_qr} />
              <TopRefererCard data={overviewData.mostReferrer} />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <LinkCreateCard />
              <RecentActivityCard />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <TopPerformingLinksCard data={overviewData.mostClick} />
              <UsageStatisticsCard data={"lapar"} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TotalLinksCard({ data }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Links</CardTitle>
        <LinkIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data}</div>
        <p className="text-xs text-muted-foreground">+20% from last month</p>
      </CardContent>
    </Card>
  );
}

function TotalClicksCard({ data }) {
  console.log(data);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
        <MousePointerClick className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data}</div>
        <p className="text-xs text-muted-foreground">+15% from last month</p>
      </CardContent>
    </Card>
  );
}

function TotalQrCodesCard({ data }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active QR Codes</CardTitle>
        <QrCode className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data}</div>
        <p className="text-xs text-muted-foreground">+5% from last month</p>
      </CardContent>
    </Card>
  );
}

function TopRefererCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Top Referrers</CardTitle>
        <Globe2 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">Twitter</div>
        <p className="text-xs text-muted-foreground">30% of total traffic</p>
      </CardContent>
    </Card>
  );
}

function LinkCreateCard() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Quick Link Creation</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="link">Link to shorten</Label>
              <Input
                id="link"
                placeholder="https://example.com/very-long-url"
              />
            </div>
            <Button>Create Short Link</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function RecentActivityCard() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest link activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                New link created
              </p>
              <p className="text-sm text-muted-foreground">short.ly/abc123</p>
            </div>
            <div className="ml-auto font-medium">Just now</div>
          </div>
          <div className="flex items-center">
            <MousePointerClick className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Link clicked</p>
              <p className="text-sm text-muted-foreground">short.ly/xyz789</p>
            </div>
            <div className="ml-auto font-medium">5m ago</div>
          </div>
          <div className="flex items-center">
            <QrCode className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                QR Code scanned
              </p>
              <p className="text-sm text-muted-foreground">Product QR Code</p>
            </div>
            <div className="ml-auto font-medium">1h ago</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TopPerformingLinksCard({ data }) {
  const links = data;
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Top Performing Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {links &&
            links.map((link) => (
              <div key={link.id} className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {link.shortUrl}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {link.total} clicks
                  </p>
                </div>
                <div className="ml-auto font-medium">+5%</div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
function UsageStatisticsCard() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Usage Statistics</CardTitle>
        <CardDescription>Your account usage this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <LinkIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Links Created</p>
              <p className="text-sm text-muted-foreground">50 / 100</p>
            </div>
            <div className="ml-auto font-medium">50%</div>
          </div>
          <div className="flex items-center">
            <QrCode className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                QR Codes Generated
              </p>
              <p className="text-sm text-muted-foreground">10 / 20</p>
            </div>
            <div className="ml-auto font-medium">50%</div>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                Days Left in Billing Cycle
              </p>
              <p className="text-sm text-muted-foreground">15 days</p>
            </div>
            <div className="ml-auto font-medium">50%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default Page;
