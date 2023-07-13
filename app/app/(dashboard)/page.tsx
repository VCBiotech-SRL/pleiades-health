import { Greeter } from "@/components/greeter";
import OverviewSitesCTA from "@/components/overview-sites-cta";
import OverviewStats from "@/components/overview-stats";
import PlacholderCard from "@/components/placeholder-card";
import Posts from "@/components/posts";
import Sites from "@/components/sites";
import { Suspense } from "react";

export default function Overview() {
  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-6">
      <Greeter />
      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Overview
        </h1>

        <div className="grid gap-6 sm:grid-cols-2">
          <OverviewStats metric="Total de Visitas" total={142091} />
          <OverviewStats metric="Contactos" total={12189} />
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Top Sites
          </h1>
          <Suspense fallback={null}>
            <OverviewSitesCTA />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <PlacholderCard key={i} />
              ))}
            </div>
          }
        >
          <Sites limit={4} />
        </Suspense>
      </div>

      <div className="flex flex-col space-y-6">
        <h1 className="font-cal text-3xl font-bold dark:text-white">
          Recent Posts
        </h1>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <PlacholderCard key={i} />
              ))}
            </div>
          }
        >
          <Posts limit={8} />
        </Suspense>
      </div>
    </div>
  );
}
