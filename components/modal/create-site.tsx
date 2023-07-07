"use client";

import { toast } from "sonner";
import { createSite } from "@/lib/actions/site";
import { useRouter } from "next/navigation";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import { useModal } from "./provider";
import va from "@vercel/analytics";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { intl } from "@/intl";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function CreateSiteModal() {
  const router = useRouter();
  const modal = useModal();
  const dict = intl().site.createModal;

  const [data, setData] = useState({
    name: "",
    subdomain: "",
    description: "",
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      subdomain: prev.name
        .toLowerCase()
        .trim()
        .replace(/[\W_]+/g, "-"),
    }));
  }, [data.name]);

  const handleSubmit = async (data: FormData) => {
    // Extract data from action
    const name = data.get("name") as string;
    const subdomain = data.get("subdomain") as string;
    const description = data.get("description") as string;

    // Run update function to create a site
    const { success, site, error } = await createSite({
      name,
      subdomain,
      description,
    });

    // Handle errors
    if (!success || !site) {
      toast.error(error);
      return;
    }

    // Track new page
    va.track("Created Site");

    // Push to new route
    const { id } = site;
    router.refresh();
    router.push(`/site/${id}`);
    modal?.hide();
    toast.success(`Successfully created site!`);
  };

  return (
    <form
      action={handleSubmit}
      className="w-full rounded-md bg-background md:max-w-md md:border md:shadow"
    >
      <div className="relative flex flex-col space-y-6 p-5 md:p-10">
        <h2 className="font-cal text-2xl dark:text-white">
          {dict.title}
        </h2>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="name">
            {dict.form.name.label}
          </Label>
          <Input
            name="name"
            type="text"
            placeholder={dict.form.name.placeholder}
            autoFocus
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            maxLength={32}
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="name">
            {dict.form.subdomain.label}
          </Label>

          <div className="flex w-full max-w-md">
            <Input
              name="subdomain"
              type="text"
              placeholder={dict.form.subdomain.placeholder}
              value={data.subdomain}
              onChange={(e) => setData({ ...data, subdomain: e.target.value })}
              autoCapitalize="off"
              pattern="[a-zA-Z0-9\-]+" // only allow lowercase letters, numbers, and dashes
              maxLength={32}
              required
              className="rounded-r-none"
            />

            <div
              className={cn(
                "flex items-center rounded-r-md border border-l-0 bg-stone-200 text-stone-800 px-3 text-sm shadow-sm dark:bg-stone-800 text-stone-200",
              )}
            >
              .{process.env.NEXT_PUBLIC_ROOT_DOMAIN}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="description">
            {dict.form.description.label}
          </Label>
          <Textarea
            name="description"
            placeholder={dict.form.description.placeholder}
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            maxLength={140}
            rows={3}
          >
          </Textarea>
        </div>
      </div>
      <div className="flex items-center justify-end rounded-b-lg border-t border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-800">
        <CreateSiteFormButton />
      </div>
    </form>
  );
}
function CreateSiteFormButton() {
  const { pending } = useFormStatus();
  const dict = intl().site.createModal;
  return (
    <Button
      className={cn("w-full h-12")}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>{dict.buttonText}</p>}
    </Button>
  );
}
