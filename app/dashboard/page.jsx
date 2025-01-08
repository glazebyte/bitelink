import { LinkTable } from "@/components/link-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LinkForm from "@/components/linkform";
import DashboardHeader from "@/components/dashboard-header";
export default function Page() {
  return (
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <div className="flex justify-between py-2 items-center">
          <h2 className="text-xl font-bold dark:text-white px-2">
            {" "}
            Link Table
          </h2>
          <LinkModal />
        </div>
        <LinkTable />
      </div>
  );
}

export function LinkModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Link</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Link</DialogTitle>
          <DialogDescription>
            <LinkForm />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
