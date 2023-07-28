import React from "react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { z } from "zod";

export const simpleHero = z.object({
  highlight: z.string().optional(),
  logo: z.string().url().optional(),
  title: z.string(),
  subtitle: z.string(),
  callToAction1__text: z.string(),
  callToAction1__href: z.string(),
  callToAction2__text: z.string(),
  callToAction2__href: z.string(),
});

export type SimpleHero = z.infer<typeof simpleHero>;

export const LandingHero1: React.FC<SimpleHero> = ({
  highlight,
  title,
  subtitle,
  callToAction1__text,
  callToAction1__href,
  callToAction2__text,
  callToAction2__href,
}) => {
  return (
    <div className="grid gap-3 py-5">
      {highlight &&
        (
          <span className="text-md mx-auto mb-5 hidden select-none rounded-2xl bg-muted px-4 py-1.5 text-center font-medium sm:flex">
            {highlight}
          </span>
        )}
      <div className="flex flex-col items-center justify-center">
        <div className="flex select-none flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <div className="font-cal lg:text-10xl relative text-center text-7xl font-extrabold md:text-8xl">
            <h1
              className={cn(
                "from-primary absolute mx-auto w-full bg-gradient-to-r to-secondary bg-clip-text text-transparent",
              )}
            >
              {title}
            </h1>
            <h1
              className={cn(
                "animate-bg-pulse-slow to-primary-300 bg-gradient-to-r from-primary bg-clip-text text-transparent opacity-0",
              )}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-2 mt-6 flex flex-row items-center justify-center text-center lg:mt-10">
        <p
          className={cn(
            "text-base font-normal leading-relaxed text-secondary-foreground max-w-4xl",
            subtitle.length > 24
              ? "text-xl md:text-2xl"
              : "text-2xl lg:text-4xl",
          )}
        >
          <Balancer>{subtitle}</Balancer>
        </p>
      </div>
      {callToAction1__text && callToAction2__text && (
        <div className="mt-6 flex w-full flex-col justify-center space-y-4 px-6 md:mx-auto md:mt-14 md:max-w-6xl md:flex-row md:space-x-8 md:space-y-0 md:px-0">
          <Link href={callToAction1__href}>
            <Button
              size="lg"
              className="group w-full md:w-64"
              variant={"outline"}
            >
              <Image
                src="/logo.svg"
                className="h-5 w-5 duration-500 mr-2"
                alt="Image logo"
                width={500}
                height={500}
              />
              {callToAction1__text}
            </Button>
          </Link>
          <Link href={callToAction2__href}>
            <Button
              size="lg"
              className="rounded w-full md:w-64"
              variant="default"
            >
              {callToAction2__text}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export const SimpleHero1: React.FC<SimpleHero> = ({
  highlight,
  title,
  subtitle,
}) => {
  return (
    <div className="mx-10 flex flex-col justify-center gap-1 text-center">
      <div className="mx-auto mb-2 h-0.5 w-6 bg-zinc-200" />
      {highlight && (
        <span className="mx-auto mb-2 select-none px-4 text-center font-semibold text-zinc-300">
          {highlight}
        </span>
      )}
      <h1
        className={cn(
          "mb-4 text-center text-4xl font-medium text-zinc-200 lg:text-6xl",
        )}
      >
        {title}
      </h1>
      <h1 className="text-center text-lg font-normal text-secondary-foreground lg:text-2xl">
        {subtitle}
      </h1>
    </div>
  );
};

export const SimpleHero2: React.FC<SimpleHero> = ({
  highlight,
  title,
  subtitle,
}) => {
  return (
    <div className="mx-10 flex flex-col justify-center space-y-5 text-center">
      {highlight && highlight}
      <h1 className="font-heading text-center text-4xl font-bold tracking-wide text-primary lg:text-7xl">
        {title}
      </h1>
      <h1 className="text-center text-lg font-light text-secondary-foreground">
        {subtitle}
      </h1>
    </div>
  );
};

export const SimpleHeros = {
  simpleHero1: SimpleHero1,
  simpleHero2: SimpleHero2,
  landingHero1: LandingHero1,
};

export type SimpleHeroComponent = keyof typeof SimpleHeros;
