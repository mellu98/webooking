"use client";

import { Inbox, CalendarCheck, Users, Wallet, LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const iconMap: Record<string, LucideIcon> = {
  Inbox,
  CalendarCheck,
  Users,
  Wallet,
};

interface StatCardProps {
  title: string;
  value: string | number;
  iconName: string;
  trend?: string;
  trendUp?: boolean;
}

export default function StatCard({ title, value, iconName, trend, trendUp }: StatCardProps) {
  const Icon = iconMap[iconName] || Inbox;

  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            {trend && (
              <p className={`text-xs font-medium ${trendUp ? "text-emerald-600" : "text-rose-600"}`}>
                {trendUp ? "↑" : "↓"} {trend}
              </p>
            )}
          </div>
          <div className="p-3 rounded-xl bg-violet-50">
            <Icon className="w-5 h-5 text-violet-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
