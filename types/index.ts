import { Role, RequestStatus, EventStatus, PaymentStatus } from "@prisma/client";

export type UserRole = Role;
export type BookingStatus = RequestStatus;
export type EventState = EventStatus;
export type PaymentState = PaymentStatus;

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  roles: UserRole[];
}
