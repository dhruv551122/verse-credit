"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContactPageQueryResult } from "@sanity-types/*";
import { MessageCircleHeartIcon } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(3, "Minimum 3 characters required")
    .nonempty("Required"),
  lastName: z
    .string()
    .min(3, "Minimum 3 characters required")
    .nonempty("Required"),
  email: z.email("Please enter valid email.").nonempty("Required"),
  phoneNo: z
    .string()
    .regex(/^\d+$/, "Please enter valid number")
    .min(10, "Must be 10 digit long")
    .max(10, "Must be 10 digit long"),
  message: z.string(),
});

const ContactForm = ({
  contactPage,
}: {
  contactPage: NonNullable<ContactPageQueryResult>;
}) => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      message: "",
    },
    resolver: zodResolver(contactFormSchema),
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await fetch("/api/send-email", {
        body: JSON.stringify(data),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const response = await res.json();
      if (!response.success) {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-width-container padding-container py-0! -translate-y-20">
      <div className="p-8 bg-white shadow-2xl rounded-2xl text-tuatara flex flex-col gap-6">
        <h2 className="flex text-chathams-blue items-center gap-2 text-2xl font-semibold">
          <MessageCircleHeartIcon />
          <span>{contactPage.formTitle}</span>
        </h2>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <FormField
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="lastName"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phoneNo"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone No.</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="message"
              control={control}
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input
                      as="textarea"
                      {...field}
                      className="max-h-30 min-h-15"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <Button className="cursor-pointer">Submit</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
