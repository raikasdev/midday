import type { Template } from "@midday/invoice/types";
import { format } from "date-fns";

type Props = {
  template: Template;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
};

export function Meta({ template, invoiceNumber, issueDate, dueDate }: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 items-center">
      <div className="flex space-x-1 items-center">
        <div className="flex items-center flex-shrink-0 space-x-1">
          <span className="truncate font-mono text-[11px] text-[#878787]">
            {template.invoice_no_label}:
          </span>
          <span className="text-[11px] font-mono flex-shrink-0">
            {invoiceNumber}
          </span>
        </div>
      </div>

      <div>
        <div>
          <div className="flex space-x-1 items-center">
            <div className="flex items-center flex-shrink-0 space-x-1">
              <span className="truncate font-mono text-[11px] text-[#878787]">
                {template.issue_date_label}:
              </span>
              <span className="text-[11px] font-mono flex-shrink-0">
                {format(new Date(issueDate), template.date_format)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="flex space-x-1 items-center">
            <div className="flex items-center flex-shrink-0 space-x-1">
              <span className="truncate font-mono text-[11px] text-[#878787]">
                {template.due_date_label}:
              </span>
              <span className="text-[11px] font-mono flex-shrink-0">
                {format(new Date(dueDate), template.date_format)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
