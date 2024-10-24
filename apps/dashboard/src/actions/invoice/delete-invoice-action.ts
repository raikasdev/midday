"use server";

import { authActionClient } from "@/actions/safe-action";
import { revalidatePath } from "next/cache";
import { deleteInvoiceSchema } from "./schema";

export const deleteInvoiceAction = authActionClient
  .metadata({
    name: "delete-invoice",
  })
  .schema(deleteInvoiceSchema)
  .action(async ({ parsedInput: { id }, ctx: { user, supabase } }) => {
    const teamId = user.team_id;

    const { data } = await supabase
      .from("invoices")
      .delete()
      .eq("id", id)
      .select("*")
      .single();

    revalidatePath("/invoices");

    return data;
  });
