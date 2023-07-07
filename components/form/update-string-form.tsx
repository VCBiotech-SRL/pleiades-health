"use client";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import va from "@vercel/analytics";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import LoadingDots from "../icons/loading-dots";
import { useState } from "react";

type MetadataForm = {
  title: string;
  description: string;
  helpText: string;
  handleSubmit: any; // This is due to some boundary effects
  inputAttrs: {
    name: string;
    type: "string" | "email";
    defaultValue: string;
    placeholder: string;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
};

export function UpdateStringForm(
  { title, description, helpText, inputAttrs, handleSubmit }: MetadataForm,
) {
  // Get form data for update
  const { id } = useParams() as { id?: string };
  const router = useRouter();
  const { update } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    value: z.string()
      .min(inputAttrs.minLength ?? 10, "Too short")
      .max(
        inputAttrs.maxLength ?? 32,
        "Too long",
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: inputAttrs.defaultValue ?? "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(data: z.infer<typeof formSchema>) {
    // Is isSubmitting
    setIsSubmitting(true);
    // Do something with the form values.
    handleSubmit({ value: data.value, key: inputAttrs.name }).then(
      async (res: any) => {
        if (res.error) {
          toast.error(res.error);
          setIsSubmitting(false);
        } else {
          va.track(`Updated ${inputAttrs.name}`, id ? { id } : {});
          if (id) {
            router.refresh();
          } else {
            await update();
            router.refresh();
          }
          toast.success(`¡Actualización exitosa!`);
          setIsSubmitting(false);
        }
      },
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded border bg-background"
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className="relative flex flex-col space-y-4 p-5 sm:p-10">
              <FormLabel className="capitalize text-primary font-cal text-xl">
                {title}
              </FormLabel>
              <FormDescription className="text-sm text-secondary-foreground">
                {description}
              </FormDescription>
              <FormControl>
                {inputAttrs.name === "description"
                  ? <Textarea {...field} placeholder={inputAttrs.placeholder} />
                  : <Input {...field} placeholder={inputAttrs.placeholder} />}
              </FormControl>
            </FormItem>
          )}
        />
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-2 rounded-b-lg",
            "bg-secondary border-t sm:flex-row sm:justify-between sm:space-y-0 sm:px-10 p-3",
          )}
        >
          <p className="text-sm text-secondary-foreground">
            {form.formState.errors && helpText}
          </p>
          <FormMessage />
          <Button
            className={cn(
              isSubmitting ??
                "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300",
              "w-24",
            )}
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingDots color="#808080" /> : <p>Guardar</p>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
