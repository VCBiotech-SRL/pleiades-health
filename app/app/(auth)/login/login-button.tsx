"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type SignInProps = {
  provider: "google" | "github";
  children: React.ReactNode;
};

export default function LoginButton({ provider, children }: SignInProps) {
  const [loading, setLoading] = useState(false);

  // Get error message added by next/auth in URL.
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");

  useEffect(() => {
    const errorMessage = Array.isArray(error) ? error.pop() : error;
    errorMessage && toast.error(errorMessage);
  }, [error]);

  return (
    <Button
      disabled={loading}
      onClick={() => {
        setLoading(true);
        signIn(provider);
      }}
      className={cn(loading ?? "cursor-not-allowed", "w-full")}
      variant={"outline"}
      size={"lg"}
    >
      {loading ? <LoadingDots color="#A8A29E" /> : children}
    </Button>
  );
}
