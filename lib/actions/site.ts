"use server";

import { Site } from "@prisma/client";
import { revalidateTag } from "next/cache";

import prisma from "@/lib/prisma";
import { env } from "@/env.mjs";
import { getSession } from "@/lib/auth";
import {
  addDomainToVercel,
  removeDomainFromVercelProject,
  validDomainRegex,
} from "@/lib/domains";
import { generateId } from "@/lib/utils";
import { put } from "@vercel/blob";

async function getAuthedSiteFromId(siteId: string) {
  const session = await getSession();
  if (!session) {
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
      error: "Not authorized",
    };
  }
  return { success: true, site };
}

export async function createSite(
  payload: { name: string; description: string; subdomain: string },
) {
  // Get session
  const session = await getSession();
  // Confirm user is logged in
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  // Get variables
  const { name, description, subdomain } = payload;
  // Try update database
  try {
    const site = await prisma.site.create({
      data: {
        name,
        description,
        subdomain,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    // Revalidate tag for incresing static regen
    revalidateTag(
      `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    // Return resppnse
    return { success: true, site };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        success: false,
        error: `This subdomain is already taken`,
      };
    } else {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export async function updateSiteName(name: string, siteId: string) {
  // Check if user is authed
  const { success, site, error } = await getAuthedSiteFromId(siteId);

  // If site wasn't found, return it
  if (!success || !site) {
    return {
      success,
      error,
    };
  }
  // Try update database
  try {
    const updatedSite = await prisma.site.update({
      where: {
        id: site.id,
      },
      data: {
        name,
      },
    });
    // Revalidate tag for incresing static regen
    revalidateTag(
      `${updatedSite.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    // Return resppnse
    return { success: true, site };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        success: false,
        error: `This name is already taken`,
      };
    } else {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export async function updateSiteDescription(subdomain: string, site: Site) {
  // Check if user is authed
  getAuthedSiteFromId(site.id);
  // Try update database
  try {
    const updatedSite = await prisma.site.update({
      where: {
        id: site.id,
      },
      data: {
        subdomain,
      },
    });
    // Revalidate tag for incresing static regen
    revalidateTag(
      `${updatedSite.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    // Return resppnse
    return { success: true, site };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        success: false,
        error: `This name is already taken`,
      };
    } else {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export async function updateSiteSubdomain(description: string, site: Site) {
  // Check if user is authed
  getAuthedSiteFromId(site.id);
  // Try update database
  try {
    const updatedSite = await prisma.site.update({
      where: {
        id: site.id,
      },
      data: {
        description,
      },
    });
    // Revalidate tag for incresing static regen
    revalidateTag(
      `${updatedSite.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    // Return resppnse
    return { success: true, site };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        success: false,
        error: `This name is already taken`,
      };
    } else {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export async function updateSiteCustomDomain(
  customDomain: string,
  site: Site,
) {
  // Check if user is authed
  getAuthedSiteFromId(site.id);

  // Check domain
  if (customDomain.includes(env.NEXT_PUBLIC_ROOT_DOMAIN)) {
    return {
      success: false,
      error: "Cannot use root domain as custom domain.",
    };
  }

  if (!validDomainRegex.test(customDomain)) {
    return {
      success: false,
      error: "This is not a valid domain.",
    };
  }

  // Try update database
  try {
    const updatedSite = await prisma.site.update({
      where: {
        id: site.id,
      },
      data: {
        customDomain,
      },
    });

    // Add to vercel
    await addDomainToVercel(customDomain);

    // Revalidate tag for incresing static regen
    revalidateTag(
      `${updatedSite.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );

    if (site.customDomain && site.customDomain !== customDomain) {
      await removeDomainFromVercelProject(site.customDomain);
    }

    // Return resppnse
    return { success: true, site };
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        success: false,
        error: `This name is already taken`,
      };
    } else {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export async function updateSiteLogo(logo: File, site: Site) {
  // Check if user is authed
  getAuthedSiteFromId(site.id);

  // Create logo filename
  const fileType = logo.type.split("/")[1];
  const filename = `${generateId()}.${fileType}`;

  const { url } = await put(filename, logo, {
    access: "public",
  });

  // Try update database
  try {
    const updatedSite = await prisma.site.update({
      where: {
        id: site.id,
      },
      data: {
        logo: url,
      },
    });

    // Revalidate tag for incresing static regen
    revalidateTag(
      `${updatedSite.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );

    // Return resppnse
    return { success: true, site };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error: `Site logo could not be updated. Contact support.`,
    };
  }
}

export async function updateSiteImage(image: File, site: Site) {
  // Check if user is authed
  getAuthedSiteFromId(site.id);

  // Create logo filename
  const fileType = image.type.split("/")[1];
  const filename = `${generateId()}.${fileType}`;

  const { url } = await put(filename, image, {
    access: "public",
  });

  // Try update database
  try {
    const updatedSite = await prisma.site.update({
      where: {
        id: site.id,
      },
      data: {
        logo: url,
      },
    });

    // Revalidate tag for incresing static regen
    revalidateTag(
      `${updatedSite.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );

    // Return resppnse
    return { success: true, site };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      error: `Site image could not be updated. Contact support.`,
    };
  }
}
