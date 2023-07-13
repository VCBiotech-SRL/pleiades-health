import { buttonVariants } from "./ui/button";
import BlurImage from "@/components/blur-image";
import { cn, placeholderBlurhash } from "@/lib/utils";
import { Post, Site } from "@prisma/client";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function PostCard({
  data,
}: {
  data: Post & { site: Site | null };
}) {
  const url = `${data.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${data.slug}`;

  return (
    <div className="relative pb-8 shadow-md transition-all hover:shadow-xl rounded-b border dark:hover:border-white">
      <Link href={`/post/${data.id}`} className="flex flex-col overflow-hidden">
        <div className="relative h-40 overflow-hidden rounded-t">
          <BlurImage
            alt={data.title ?? "Card thumbnail"}
            width={500}
            height={400}
            className="h-full object-cover"
            src={data.image ?? "/placeholder.png"}
            placeholder="blur"
            blurDataURL={data.imageBlurhash ?? placeholderBlurhash}
          />
          {!data.published && (
            <span className="absolute bottom-2 right-2 rounded-md border border-stone-200 bg-white px-3 py-0.5 text-sm font-medium text-stone-600 shadow-md">
              Draft
            </span>
          )}
        </div>
        <div className="p-4 py-6">
          <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white dark:text-white">
            {data.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
            {data.description}
          </p>
        </div>
      </Link>
      <div className="absolute bottom-3 w-full flex px-4">
        <Link
          className={cn(
            buttonVariants({ variant: "muted", size: "sm" }),
            "flex justify-between w-full text-sm px-2",
          )}
          href={
            process.env.NEXT_PUBLIC_VERCEL_ENV
              ? `https://${url}`
              : `http://${data.site?.subdomain}.localhost:3000/${data.slug}`
          }
          target="_blank"
          rel="noreferrer"
        >
          <span className="w-full truncate mr-4">{url}</span>
          <ArrowTopRightIcon width={18} />
        </Link>
      </div>
    </div>
  );
}
