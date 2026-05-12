"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/components/layout/ClerkOrMock";
import {
  LayoutDashboard,
  Users,
  Compass,
  CalendarDays,
  ClipboardList,
  UserCircle,
  Settings,
  Music,
  Menu,
  Briefcase,
  Building2,
  Mic2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Role } from "@prisma/client";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["BOOKING_AGENT", "VENUE", "ARTIST"] },
  { label: "Esplora", href: "/explore", icon: Compass, roles: ["BOOKING_AGENT", "VENUE", "ARTIST"] },
  { label: "Artisti", href: "/artists", icon: Users, roles: ["BOOKING_AGENT", "ARTIST"] },
  { label: "Richieste", href: "/requests", icon: ClipboardList, roles: ["BOOKING_AGENT", "VENUE", "ARTIST"] },
  { label: "Eventi", href: "/events", icon: CalendarDays, roles: ["BOOKING_AGENT", "VENUE", "ARTIST"] },
  { label: "Profilo", href: "/profile", icon: UserCircle, roles: ["BOOKING_AGENT", "VENUE", "ARTIST"] },
  { label: "Impostazioni", href: "/settings", icon: Settings, roles: ["BOOKING_AGENT", "VENUE", "ARTIST"] },
];

const roleConfig: Record<string, { label: string; icon: any; color: string }> = {
  BOOKING_AGENT: { label: "Booking Agent", icon: Briefcase, color: "text-violet-400" },
  VENUE: { label: "Venue", icon: Building2, color: "text-emerald-400" },
  ARTIST: { label: "Artista", icon: Mic2, color: "text-amber-400" },
};

export default function AppSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const role = (user?.publicMetadata?.role as Role) || "BOOKING_AGENT";
  const roleInfo = roleConfig[role];
  const RoleIcon = roleInfo?.icon || Briefcase;

  const filteredNav = navItems.filter((item) => item.roles.includes(role));

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-6 py-5">
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
          <Music className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold text-white tracking-tight">WEBOOKING</span>
      </div>

      <div className="px-4 mb-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
          <RoleIcon className={`w-3.5 h-3.5 ${roleInfo?.color || "text-slate-400"}`} />
          <span className={`text-xs font-medium ${roleInfo?.color || "text-slate-400"}`}>
            {roleInfo?.label}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {filteredNav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-violet-600/20 text-violet-300 shadow-sm"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-slate-800">
        <p className="text-xs text-slate-500">WEBOOKING Marketplace v0.2</p>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 bg-slate-950 border-r border-slate-800 z-40">
        <NavContent />
      </aside>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger className="inline-flex items-center justify-center rounded-lg border border-border bg-white size-8 hover:bg-muted hover:text-foreground transition-colors">
            <Menu className="w-4 h-4" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-slate-950 border-slate-800 p-0">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
