"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";

const FormSchema = z.object({
  todo: z.string().min(2, {
    message: "Todo must be at least 2 characters.",
  }),
});

interface AddItemFormProps {
  onNewItem: (item: { id: number; name: string }) => void;
}

export function AddItemForm({ onNewItem }: AddItemFormProps) {
  const [newItem, setNewItem] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const submitNewItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const options = {
      method: "POST",
      body: JSON.stringify({ name: newItem }),
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/items", options)
      .then((r) => r.json())
      .then((item) => {
        onNewItem(item);
        setSubmitting(false);
        setNewItem("");
      });
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      todo: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[640px] space-y-6 flex items-center"
      >
        <FormField
          control={form.control}
          name="todo"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex gap-1">
                <FormControl>
                  <Input placeholder="Add todo list" {...field} />
                </FormControl>
                <Button type="submit" disabled={!newItem.length || submitting}>
                  {submitting ? "Adding..." : "Add Item"}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
