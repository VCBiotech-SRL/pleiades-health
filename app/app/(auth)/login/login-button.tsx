"use client";

import LoadingDots from "@/components/icons/loading-dots";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
      className={`${
        loading
          ? "cursor-not-allowed bg-stone-50"
          : "bg-white hover:bg-stone-50 active:bg-stone-100"
      } group my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none`}
    >
      {loading ? <LoadingDots color="#A8A29E" /> : (
        <>
          {children}
        </>
      )}
    </Button>
  );
}
