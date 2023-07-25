"use server";

import { getSession } from "@/lib/auth";
import { env } from "@/env.mjs";
import { prisma } from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { PageCreate, PageUpdate } from "@/lib/validators/pages";

export async function createPage(payload: PageCreate) {
  const session = await getSession();

  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const page = await prisma.page.create({ data: payload });
    revalidateTag(`${page.title}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`);
    return { success: true, page };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        success: false,
        error: `This page already exists`,
      };
    } else {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export async function updatePage(data: PageUpdate) {
  const session = await getSession();

  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  try {
    const page = await prisma.page.update({
      where: {
        id: data.id,
      },
      data,
    });
    revalidateTag(`${page.title}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`);
    return { success: true, page };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        success: false,
        error: `This page already exists`,
      };
    } else {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export async function updateSiteLinks(
  { pages, siteId }: { pages: PageUpdate[]; siteId: string },
) {
  const session = await getSession();

  if (!session?.user.id) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  const site = await prisma.site.findUnique({
    where: {
      id: siteId,
    },
  });

  if (!site || site.userId !== session.user.id) {
    return {
      success: false,
      error: "The site this page belongs to doesn't exist.",
    };
  }

  try {
    const result = await prisma.$transaction([...pages.map((page) => (
      prisma.page.update({ where: { id: page.id }, data: { ...page } })
    ))]);

    const domain = `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;

    // THIS IS A MISTAKE, SUBDOMAINS MUST ALWAYS EXIST!!! FIX ME
    revalidateTag(`${domain}-metadata`);

    return { success: true, data: result };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        success: false,
        error: `This page already exists`,
      };
    } else {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
