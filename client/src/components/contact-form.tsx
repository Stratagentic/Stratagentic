import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      return await apiRequest("POST", "/api/leads", data);
    },
    onSuccess: async () => {
      setIsSubmitted(true);
      form.reset();
      
      try {
        const sessionId = sessionStorage.getItem('analytics_session_id') || 'unknown';
        await apiRequest("POST", "/api/analytics", {
          eventType: "form_submit",
          eventData: { form: "contact", timestamp: new Date().toISOString() },
          sessionId,
        });
      } catch (error) {
        console.error("Failed to track form submission:", error);
      }
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you soon.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertLead) => {
    mutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12" data-testid="text-form-success">
        <h3 className="text-4xl font-bold mb-4 tracking-tight">
          Thankyou!
        </h3>
        <p className="text-lg mb-8">
          Your message has been received. We'll be in touch soon.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-[#2563EB] hover:underline font-bold"
          data-testid="button-send-another"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-sm uppercase tracking-tight">
                  Your name*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-black focus:border-[#2563EB] focus:ring-[#2563EB]"
                    placeholder="Jane Doe"
                    data-testid="input-name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold text-sm uppercase tracking-tight">
                  Your email*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="border-black focus:border-[#2563EB] focus:ring-[#2563EB]"
                    placeholder="jane@company.com"
                    data-testid="input-email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-sm uppercase tracking-tight">
                Your company
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  className="border-black focus:border-[#2563EB] focus:ring-[#2563EB]"
                  placeholder="Company name"
                  data-testid="input-company"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-sm uppercase tracking-tight">
                Your message*
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="border-black focus:border-[#2563EB] focus:ring-[#2563EB] min-h-[150px]"
                  placeholder="Tell us about your transformation goals..."
                  data-testid="input-message"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-[#2563EB] text-white font-bold px-12 py-4 hover:bg-[#1d4ed8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-submit"
        >
          {mutation.isPending ? "Sending..." : "Send message"}
        </button>
      </form>
    </Form>
  );
}
