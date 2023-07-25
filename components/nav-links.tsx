"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLinks({
  links,
}: {
  links: { title: string; href: string }[];
}) {
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
