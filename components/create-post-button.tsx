"use client";

import { Button } from "./ui/button";
import LoadingDots from "@/components/icons/loading-dots";
import { createPost } from "@/lib/actions";
import { cn } from "@/lib/utils";
import va from "@vercel/analytics";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";

export default function CreatePostButton() {
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          const post = await createPost(null, id, null);
          va.track("Created Post");
          router.refresh();
          router.push(`/post/${post.id}`);
        })
      }
      className={cn(
        "w-36",
        isPending ? "cursor-not-allowed bg-opacity-50" : "",
      )}
      disabled={isPending}
    >
      {isPending ? <LoadingDots color="#808080" /> : <p>Crear Artículo</p>}
    </Button>
  );
}
