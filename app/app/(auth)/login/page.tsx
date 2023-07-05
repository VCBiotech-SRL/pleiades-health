import Image from "next/image";
import LoginButton from "./login-button";
import { Suspense } from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { GoogleIcon } from "@/components/icons/google-icon";

export default function LoginPage() {
  return (
    <div className="mx-5 border border-stone-200 py-10 sm:mx-auto sm:w-full sm:max-w-lg sm:rounded-lg sm:shadow-md">
      <Image
        alt="Platforms Starter Kit"
        width={100}
        height={100}
        className="relative mx-auto h-12 w-auto invert"
        src="/logo.png"
      />
      <h1 className="mt-6 text-center font-cal text-3xl text-gray-900">
        VCBiotech Health Community
      </h1>
      <p className="mt-2 text-center text-sm text-gray-600">
        Utiliza unos de nuestros proveedores para ingresar a tu sistema
      </p>

      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100" />
          }
        >
          <LoginButton provider="github">
            <GitHubLogoIcon className="text-neutral-900 dark:text-neutral-100" />
            <p className="text-sm font-medium text-stone-600">
              Github
            </p>
          </LoginButton>
          <LoginButton provider="google">
            <GoogleIcon className="text-neutral-900 dark:text-neutral-100" />
            <p className="text-sm font-medium text-stone-600">
              Google
            </p>
          </LoginButton>
        </Suspense>
      </div>
    </div>
  );
}
