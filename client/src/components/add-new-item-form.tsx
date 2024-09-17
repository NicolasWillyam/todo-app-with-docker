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
  onNewItem: (item: { id: number; name: string; completed: boolean }) => void;
}

export function AddItemForm({ onNewItem }: AddItemFormProps) {
  const [newItem, setNewItem] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const submitNewItem = (data: z.infer<typeof FormSchema>) => {
    setSubmitting(true);
    const options = {
      method: "POST",
      body: JSON.stringify({ name: data.todo }),
      headers: { "Content-Type": "application/json" },
    };

    toast({
      title: "Add todo success!",
      description: <div className="">Todo: {data.todo}</div>,
    });

    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/items`, options)
      .then((r) => r.json())
      .then((item) => {
        form.reset();
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitNewItem)}
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
                <Button type="submit" disabled={submitting}>
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
