"use client";

import { ModeToggle } from "./theme-toggler";
import { Button, buttonVariants } from "./ui/button";
import { env } from "@/env.mjs";
import { getSiteFromPostId } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { ChatBubbleIcon, FileTextIcon } from "@radix-ui/react-icons";
import {
  ArrowLeft,
  BarChart3,
  Edit3,
  Globe,
  LayoutDashboard,
  Mails,
  Menu,
  Newspaper,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";

const externalLinks = [
  {
    name: "Ayuda",
    href: `https://${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    icon: <ChatBubbleIcon width={18} />,
  },
  {
    name: "Docs",
    href: `https://docs.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    icon: <FileTextIcon width={18} />,
  },
];

export default function Nav({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();
  const { id } = useParams() as { id?: string };

  const [siteId, setSiteId] = useState<string | null>();

  useEffect(() => {
    if (segments[0] === "post" && id) {
      getSiteFromPostId(id).then((id) => {
        setSiteId(id);
      });
    }
  }, [segments, id]);

  const tabs = useMemo(() => {
    if (segments[0] === "site" && id) {
      return [
        {
          name: "Back to All Sites",
          href: "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Posts",
          href: `/site/${id}`,
          isActive: segments.length === 2,
          icon: <Newspaper width={18} />,
        },
        {
          name: "Analytics",
          href: `/site/${id}/analytics`,
          isActive: segments.includes("analytics"),
          icon: <BarChart3 width={18} />,
        },
        {
          name: "Messages",
          href: `/site/${id}/messages`,
          isActive: segments.includes("messages"),
          icon: <Mails width={18} />,
        },

        {
          name: "Settings",
          href: `/site/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    } else if (segments[0] === "post" && id) {
      return [
        {
          name: "Back to All Posts",
          href: siteId ? `/site/${siteId}` : "/sites",
          icon: <ArrowLeft width={18} />,
        },
        {
          name: "Editor",
          href: `/post/${id}`,
          isActive: segments.length === 2,
          icon: <Edit3 width={18} />,
        },
        {
          name: "Settings",
          href: `/post/${id}/settings`,
          isActive: segments.includes("settings"),
          icon: <Settings width={18} />,
        },
      ];
    }
    return [
      {
        name: "Overview",
        href: "/",
        isActive: segments.length === 0,
        icon: <LayoutDashboard width={18} />,
      },
      {
        name: "Sites",
        href: "/sites",
        isActive: segments[0] === "sites",
        icon: <Globe width={18} />,
      },
      {
        name: "Settings",
        href: "/settings",
        isActive: segments[0] === "settings",
        icon: <Settings width={18} />,
      },
    ];
  }, [segments, id, siteId]);

  const [showSidebar, setShowSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    // hide sidebar on path change
    setShowSidebar(false);
  }, [pathname]);

  return (
    <>
      <Button
        variant={"outline"}
        size={"icon"}
        className={`fixed z-20 ${
          // left align for Editor, right align for other pages
          segments[0] === "post" && segments.length === 2 && !showSidebar
            ? "left-5 top-5"
            : "right-5 top-7"} sm:hidden`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <Menu width={20} />
      </Button>
      <div
        className={cn(
          "fixed z-10 flex h-full w-full flex-col justify-between border-r",
          "p-4 transition-all bg-secondary sm:w-80 sm:translate-x-0",
          showSidebar
            ? "transform translate-x-0"
            : "transform -translate-x-full",
        )}
      >
        <div className="grid gap-2">
          <div className="flex items-center space-x-2 rounded-lg py-1.5">
            <Link
              href={`https://${env.NEXT_PUBLIC_ROOT_DOMAIN}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "rounded-full p-1.5 hover:bg-background shrink-0 duration-300",
              )}
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={26}
                height={26}
                className="rounded-full dark:invert"
              />
            </Link>
            <div className="h-6 rotate-[15deg] border-l border-primary/50" />
            {children}
          </div>
          <div className="grid gap-1">
            {tabs.map(({ name, href, isActive, icon }) => (
              <Link
                key={name}
                href={href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "flex items-center space-x-3 rounded px-2 py-1.5 transition-all duration-300 ease-in-out justify-start",
                  isActive && "bg-background text-foreground",
                  "hover:bg-background",
                )}
              >
                {icon}
                <span className="text-sm font-medium">{name}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="h-[1px] w-full bg-border my-3" />
          <div className="flex gap-1">
            {externalLinks.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "muted" }),
                  "hover:bg-background",
                )}
              >
                <div className="flex space-x-3 items-center">
                  {icon}
                  <span className="text-sm font-medium">{name}</span>
                  <p>↗</p>
                </div>
              </a>
            ))}
            <ModeToggle classNames="hover:bg-background" />
          </div>
        </div>
      </div>
    </>
  );
}
