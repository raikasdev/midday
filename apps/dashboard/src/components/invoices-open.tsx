import { Card, CardContent, CardHeader, CardTitle } from "@midday/ui/card";

export function InvoicesOpen() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>€36,500.50</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          <div>Total open</div>
          <div className="text-sm text-muted-foreground">12 invoices</div>
        </div>
      </CardContent>
    </Card>
  );
}
