export const dynamic = 'force-dynamic'
import LinkCard from "@/components/link-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LinkList from "./link-list";

function Page() {
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  // const response = await fetch(`${baseUrl}/api/links`,{cache:'reload'});
  // const linksData = await response.json().then((res) => res.data);
  // console.log(linksData);
    // .then((res) => res.json())
    // .then((data) => data.data);
  // console.log(linksData);
  return (
    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Your Links</h2>
        <Button>Create New Link</Button>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search links" />
        <Button type="submit">Search</Button>
      </div>
      <div className="flex flex-col py-2 space-y-3 max-w-lg">
        <LinkList/>
      </div>
    </div>
  );
}

export default Page;
