/* eslint-disable @next/next/no-img-element */

import { truncate } from "@/lib/utils";
import { ImageResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "edge";

export default async function PostOG({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const { domain, slug } = params;

  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : null;

  const data = await prisma.post.findFirst({
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      site: {
        select: {
          image: true,
        },
      },
    },
    where: {
      OR: [
        {
          site: {
            subdomain: {
              equals: subdomain,
            },
          },
        },
        {
          site: {
            customDomain: {
              equals: domain,
            },
          },
        },
      ],
      AND: {
        slug: {
          equals: slug,
        },
      },
    },
  });

  if (!data) {
    return new Response("Not found", { status: 404 });
  }

  const clashData = await fetch(
    new URL("@/styles/CalSans-SemiBold.otf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw="flex flex-col items-center w-full h-full bg-white">
        <div tw="flex flex-col items-center justify-center mt-8">
          <h1 tw="text-6xl font-bold text-gray-900 leading-none tracking-tight">
            {data.title}
          </h1>
          <p tw="mt-4 text-xl text-gray-600 max-w-xl text-center">
            {truncate(data.description ?? "", 120)}
          </p>
          <div tw="flex items-center justify-center">
            <img
              tw="w-12 h-12 rounded-full mr-4"
              src={data.user?.image ?? "/logo.svg"}
              alt={data.user?.name ?? "Usuario de VCBiotech"}
            />
            <p tw="text-xl font-medium text-gray-900">by {data.user?.name}</p>
          </div>
          <img
            tw="mt-4 w-5/6 rounded-2xl border border-gray-200 shadow-md"
            src={data.image ?? "/logo.svg"}
            alt={data.title ?? "Publicación"}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Clash",
          data: clashData,
        },
      ],
      emoji: "blobmoji",
    },
  );
}
