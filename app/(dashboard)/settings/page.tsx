"use client";

import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Impostazioni" description="Configurazione dell'account" />

      <div className="max-w-xl space-y-6">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Notifiche</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">Le notifiche sono gestite tramite Clerk. Configura le tue preferenze nel profilo Clerk.</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Sicurezza</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500">Per modificare la password o abilitare 2FA, accedi alle impostazioni di Clerk.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
