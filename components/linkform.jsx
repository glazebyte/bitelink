"use client"
import {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  cn
} from "@/lib/utils"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"

const formSchema = z.object({
  url: z.string(),
  shortlink: z.string()
});


export default function LinkForm() {

  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values) {
    try {
      // Membuat FormData baru
      const formData = new FormData();
      formData.append("url", values.url);
      formData.append("shortlink", values.shortlink);

      // Kirim data ke API menggunakan fetch
      const response = await fetch("/api/shortlinks", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Link created successfully!");
        console.log("API Response:", data);
        form.reset(); // Reset form setelah submit berhasil
      } else {
        const error = await response.json();
        toast.error(`Failed to create link: ${error.message}`);
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="youtube.com"

                  type=""
                  {...field} />
              </FormControl>
              <FormDescription>Default url you want to short</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortlink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short LInk</FormLabel>
              <FormControl>
                <Input
                  placeholder="ytb"

                  type=""
                  {...field} />
              </FormControl>
              <FormDescription>the shorterlink you desired</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}