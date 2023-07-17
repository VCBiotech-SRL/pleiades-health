import CTA from "@/components/cta";
import ReportAbuse from "@/components/report-abuse";
import { SiteNavigator } from "@/components/site-navigator";
import { env } from "@/env.mjs";
import { getSiteData } from "@/lib/fetchers";
import prisma from "@/lib/prisma";
import { fontMapper } from "@/styles/fonts";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {
  const data = await getSiteData(params.domain);
  if (!data) {
    return null;
  }
  const {
    name: title,
    description,
    image,
    logo,
  } = data as {
    name: string;
    description: string;
    image: string;
    logo: string;
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@vercel",
    },
    icons: [logo],
    metadataBase: new URL(`https://${params.domain}`),
  };
}

export async function generateStaticParams() {
  const [subdomains, customDomains] = await Promise.all([
    prisma.site.findMany({
      select: {
        subdomain: true,
      },
    }),
    prisma.site.findMany({
      where: {
        NOT: {
          customDomain: null,
        },
      },
      select: {
        customDomain: true,
      },
    }),
  ]);

  const allPaths = [
    ...subdomains.map(({ subdomain }) => subdomain),
    ...customDomains.map(({ customDomain }) => customDomain),
  ].filter((path) => path) as Array<string>;

  return allPaths.map((domain) => ({
    params: {
      domain,
    },
  }));
}

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const { domain } = params;
  const data = await getSiteData(domain);

  if (!data) {
    notFound();
  }

  // Optional: Redirect to custom domain if it exists
  if (
    domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
    data.customDomain &&
    process.env.REDIRECT_TO_CUSTOM_DOMAIN_IF_EXISTS === "true"
  ) {
    return redirect(`https://${data.customDomain}`);
  }

  return (
    <div className={fontMapper[data.font]}>
      <SiteNavigator
        brand={{ name: data.name, logo: data.image, slogan: data.description }}
        links={[{
          title: "Nosotros",
          href: "/about",
        }, {
          title: "Servicios",
          href: "/services",
        }, {
          title: "Productos",
          href: "/products",
        }]}
      />

      <div className="mt-20">{children}</div>

      {params.domain == `demo.${env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
          params.domain == `platformize.co`
        ? <CTA />
        : <ReportAbuse />}
    </div>
  );
}
