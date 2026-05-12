"use client";

import { useUser } from "@/components/layout/ClerkOrMock";
import { UserCircle, Mail, Shield } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  const { user } = useUser();

  return (
    <div>
      <PageHeader title="Profilo" description="Le tue informazioni personali" />

      <div className="max-w-xl">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">
                <UserCircle className="w-8 h-8 text-violet-600" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{user?.fullName || "Utente"}</p>
                <p className="text-sm text-slate-500 capitalize">{(user?.publicMetadata?.role as string) || "Booking Agent"}</p>
              </div>
            </div>
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-700">{user?.primaryEmailAddress?.emailAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-700">Ruolo: {(user?.publicMetadata?.role as string) || "BOOKING_AGENT"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
