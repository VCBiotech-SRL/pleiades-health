"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { z } from "zod";

import { type PageUpdate, pageUpdate } from "@/lib/validators/pages";
import { cn } from "@/lib/utils";
import LoadingDots from "@/components/icons/loading-dots";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { updateSiteLinks } from "@/lib/actions/page";

export function FormButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      className={cn(
        "w-24",
        pending ??
          "cursor-not-allowed border bg-muted text-muted-foreground",
      )}
      disabled={pending}
    >
      {pending ? <LoadingDots color="#808080" /> : <p>Guardar</p>}
    </Button>
  );
}

const arrayOfPages = z.object({
  pages: z.array(pageUpdate),
});

type ArrayOfPages = z.infer<typeof arrayOfPages>;

export function NavLinksForm({ title, description, helpText, pages, siteId }: {
  title: string;
  description: string;
  helpText: string;
  pages: PageUpdate[];
  siteId: string;
}) {
  const form = useForm<ArrayOfPages>({
    resolver: zodResolver(arrayOfPages),
    defaultValues: {
      pages: pages.filter((p) => p.order),
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray(
    {
      control: form.control,
      name: "pages",
    },
  );

  function onSubmit(data: ArrayOfPages) {
    const { pages: updatedPages } = data;
    const updatedPagesIds = updatedPages.map((p) => p.id);
    const unUsed = pages.filter((p) => !updatedPagesIds.includes(p.id));
    updateSiteLinks({
      pages: [
        ...updatedPages,
        ...unUsed.map((unused) => {
          return {
            ...unused,
            order: null,
          };
        }),
      ],
      siteId,
    }).then((res) => {
      console.log(res);
      toast.success("Tu página fue actualizada exitosamente");
    }).catch((error) => {
      console.error(error);
      toast.error(`No pudimos actualizar tu página. Contacta soporte.`);
    });
  }

  const selectedPages = form.watch("pages");
  const errors = form.formState.errors.pages;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded border bg-background"
      >
        <div className="flex flex-col space-y-5 p-5 sm:p-10">
          <h2 className="font-cal text-xl dark:text-white">{title}</h2>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>

          <div className="flex flex-row items-center gap-2 border p-2 max-w-fit rounded">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`pages.${index}.id`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="ghost"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? pages.find(
                                  (page) => page.id === field.value,
                                )?.title
                                : errors
                                ? <FormMessage />
                                : "Elige una página"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput
                              placeholder="Elige una página..."
                              className="border-transparent focus:border-transparent focus:ring-0"
                            />
                            <CommandEmpty>
                              No encontramos tu página.
                            </CommandEmpty>
                            <CommandGroup>
                              {pages.map((page) => {
                                const isUsed = selectedPages.some((p) =>
                                  p.id === page.id
                                );
                                return (
                                  <CommandItem
                                    value={page.id}
                                    key={page.id}
                                    disabled={isUsed}
                                    className={cn(
                                      isUsed && "text-muted-foreground",
                                    )}
                                    onSelect={() => {
                                      form.setValue(`pages.${index}`, page);
                                      form.setValue(
                                        `pages.${index}.order`,
                                        index + 1,
                                      );
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        isUsed ? "opacity-100" : "opacity-0",
                                      )}
                                    />
                                    {page.title}
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                            <CommandGroup className="border-t">
                              <CommandItem
                                className="hover:!text-destructive-foreground hover:!bg-destructive transition-all duration-300 cursor-pointer"
                                onSelect={() => {
                                  remove(index);
                                }}
                              >
                                <TrashIcon className="mr-2 h-4 w-4" />
                                <span>Borrar enlace</span>
                              </CommandItem>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
            {selectedPages.length <= 3 && (
              <div
                className={cn(buttonVariants({ variant: "ghost" }))}
                onClick={() =>
                  append({
                    id: "",
                    title: null,
                    description: null,
                    order: selectedPages.length,
                  })}
              >
                <PlusIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 sm:gap-0 rounded-b border-t bg-muted p-3 sm:flex-row sm:justify-between sm:px-10">
          <p className="text-sm text-muted-foreground">{helpText}</p>
          <Button
            className={cn(
              "w-24",
              form.formState.isSubmitting ??
                "cursor-not-allowed border bg-muted text-muted-foreground",
            )}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? <LoadingDots color="#808080" />
              : <p>Guardar</p>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
