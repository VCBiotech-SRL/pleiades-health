"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NavLinks(
  { links }: { links: { title: string; href: string }[] },
) {
  // Get pathname
  const pathname = usePathname();
  return (
    <>
      {links.map((link, i) => {
        return (
          <Link
            key={i}
            className={cn(
              pathname.includes(link.href)
                ? buttonVariants({ variant: "secondary" })
                : buttonVariants({ variant: "ghost" }),
            )}
            href={`${link.href}`}
          >
            {link.title}
          </Link>
        );
      })}
    </>
  );
}
