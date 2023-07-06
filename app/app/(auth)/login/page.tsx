import Image from "next/image";
import LoginButton from "./login-button";
import { Suspense } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { GoogleIcon } from "@/components/icons/google-icon";
import { intl } from "@/intl";

export default function LoginPage() {
  const dict = intl();
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-lg sm:shadow-md p-10 rounded border dark:border-none">
      <Image
        alt="Platforms Starter Kit"
        width={100}
        height={100}
        className="relative h-20 w-auto dark:invert mx-auto"
        src="/logo.svg"
      />
      <h1 className="font-cal text-2xl text-primary text-center mt-5">
        {dict.login.title}
      </h1>

      <p className="mt-8 text-center text-base text-muted-foreground mx-auto">
        {dict.login.subtitle}
      </p>

      <div className="flex flex-col gap-5 mx-auto mt-6 w-11/12 max-w-xs sm:w-full justify-center">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100" />
          }
        >
          <LoginButton provider="google">
            <GoogleIcon className="mr-2 h-4 w-4" />
            <p className="text-base font-medium">
              Google
            </p>
          </LoginButton>
          <LoginButton provider="github">
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            <p className="text-base font-medium">
              Github
            </p>
          </LoginButton>
        </Suspense>
      </div>
    </div>
  );
}
