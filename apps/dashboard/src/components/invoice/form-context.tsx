"use client";

import {
  type InvoiceFormValues,
  type InvoiceTemplate,
  invoiceFormSchema,
} from "@/actions/invoice/schema";
import { UTCDate } from "@date-fns/utc";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMonths } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const defaultTemplate: InvoiceTemplate = {
  customer_label: "To",
  from_label: "From",
  invoice_no_label: "Invoice No",
  issue_date_label: "Issue Date",
  due_date_label: "Due Date",
  description_label: "Description",
  price_label: "Price",
  quantity_label: "Quantity",
  total_label: "Total",
  vat_label: "VAT",
  tax_label: "Sales Tax",
  payment_label: "Payment Details",
  payment_details: undefined,
  note_label: "Note",
  logo_url: undefined,
  currency: "USD",
  from_details: undefined,
  size: "a4",
  include_vat: true,
  date_format: "dd/mm/yyyy",
  include_tax: true,
  tax_rate: 10,
};

type FormContextProps = {
  children: React.ReactNode;
  template: InvoiceTemplate;
  invoiceNumber: string;
};

export function FormContext({
  children,
  template,
  invoiceNumber,
}: FormContextProps) {
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      id: uuidv4(),
      template: { ...defaultTemplate, ...template },
      customer_details: undefined,
      from_details: template.from_details ?? defaultTemplate.from_details,
      payment_details:
        template.payment_details ?? defaultTemplate.payment_details,
      note_details: undefined,
      customer_id: undefined,
      issue_date: new UTCDate(),
      due_date: addMonths(new UTCDate(), 1),
      invoice_number: invoiceNumber,
      line_items: [{ name: "", quantity: 0, price: 0 }],
      tax: undefined,
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
