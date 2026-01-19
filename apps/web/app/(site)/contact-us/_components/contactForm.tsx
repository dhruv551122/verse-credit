'use client'

import { ContactPageQueryResult } from "@sanity-types/*";
import { MessageCircleHeartIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const ContactForm = ({
  contactPage,
}: {
  contactPage: NonNullable<ContactPageQueryResult>;
  }) => {
  const form = useForm()
  return (
    <div className="max-width-container padding-container py-0! -translate-y-10">
      <div className="p-8 bg-white shadow-2xl rounded-2xl text-tuatara">
        <h2 className="flex items-center gap-2 text-2xl font-medium">
          <MessageCircleHeartIcon />
          <span>{contactPage.formTitle}</span>
        </h2>
      </div>
    </div>
  );
};

export default ContactForm;
