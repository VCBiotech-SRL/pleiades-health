import LogoutButton from "./logout-button";
import { buttonVariants } from "./ui/button";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex w-full items-center justify-between px-2">
      <Link
        href="/settings"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "rounded-full p-1.5 shrink-0 duration-300 gap-3 py-1.5 pr-4",
        )}
      >
        <Image
          src={
            session.user.image ??
            `https://avatar.vercel.sh/${session.user.email}`
          }
          width={40}
          height={40}
          alt={session.user.name ?? "User avatar"}
          className="h-6 w-6 rounded-full"
        />
        <span className="truncate text-sm font-medium">
          {session.user.name}
        </span>
      </Link>
      <LogoutButton />
    </div>
  );
}
