"use client";

import { createClinic } from '@/actions/create-clinic';
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from 'lucide-react';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(1, { message: "O Nome é obrigatório" }),
});

export default function ClinicForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await createClinic(data.name);
    } catch (error) {
      if(isRedirectError(error)) {
        return;
      }
      console.log(error);
      toast.error("Erro ao criar clínica");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? <Loader2Icon h-4 w-4 animate-spin/> : "Criar clínica"}
            </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
