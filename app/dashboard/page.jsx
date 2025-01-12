import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LinkIcon,
  MousePointerClick,
  QrCode,
  Percent,
  Globe,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function Page() {
  return (
    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
      <div className="flex flex-col py-2 space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, User!
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Links</CardTitle>
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +20% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Clicks
              </CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,678</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active QR Codes
              </CardTitle>
              <QrCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">
                +0.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
                    <p className="text-sm text-muted-foreground">
                      short.ly/abc123
                    </p>
                  </div>
                  <div className="ml-auto font-medium">Just now</div>
                </div>
                <div className="flex items-center">
                  <MousePointerClick className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Link clicked
                    </p>
                    <p className="text-sm text-muted-foreground">
                      short.ly/xyz789
                    </p>
                  </div>
                  <div className="ml-auto font-medium">5m ago</div>
                </div>
                <div className="flex items-center">
                  <QrCode className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      QR Code scanned
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Product QR Code
                    </p>
                  </div>
                  <div className="ml-auto font-medium">1h ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Top Performing Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      short.ly/best-link
                    </p>
                    <p className="text-sm text-muted-foreground">
                      1,234 clicks
                    </p>
                  </div>
                  <div className="ml-auto font-medium">+10%</div>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      short.ly/awesome
                    </p>
                    <p className="text-sm text-muted-foreground">987 clicks</p>
                  </div>
                  <div className="ml-auto font-medium">+5%</div>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      short.ly/super-promo
                    </p>
                    <p className="text-sm text-muted-foreground">765 clicks</p>
                  </div>
                  <div className="ml-auto font-medium">+3%</div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                    <p className="text-sm font-medium leading-none">
                      Links Created
                    </p>
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
        </div>
      </div>
    </div>
  );
}
