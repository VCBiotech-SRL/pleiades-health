import { buttonVariants } from "@/components/ui/button";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const session = await getSession();
  return (
    <div className="flex h-screen bg-black">
      <div className="m-auto w-48">
        <Image
          width={512}
          height={512}
          src="/logo.png"
          alt="VCBiotech Health Community"
          className="dark:invert"
        />
        <Link
          href={`/login`}
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
        >
          {session ? "Go to Dashboard" : "Sign in"}
        </Link>
      </div>
    </div>
  );
}
