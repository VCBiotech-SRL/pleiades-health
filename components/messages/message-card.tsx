import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Message, Site } from "@prisma/client";
import Link from "next/link";

export default function MessageCard({
  data,
}: {
  data: Message & { site: Site | null };
}) {
  const url = "#";

  return (
    <div className="relative pb-10 shadow-md transition-all hover:shadow-xl rounded-b border dark:hover:border-white">
      <Link href={`/post/${data.id}`} className="flex flex-col overflow-hidden">
        <div className="p-4 py-6">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white dark:text-white">
            {data.subject}
          </h3>
          <p className="mt-2 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.content}
          </p>
        </div>
      </Link>
      <div className="absolute bottom-5 w-full flex px-4 flex justify-between">
        <Link
          className={cn(
            buttonVariants({ variant: "muted", size: "sm" }),
            "flex justify-between text-sm px-2",
          )}
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {data.from}
        </Link>
      </div>
    </div>
  );
}
