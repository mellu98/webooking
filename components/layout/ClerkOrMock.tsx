"use client";

import { createContext, useContext, ReactNode } from "react";

const MockUserContext = createContext<any>(null);

function MockProvider({ children }: { children: ReactNode }) {
  const mockUser = {
    id: "mock-user-1",
    fullName: "Marco Rossi",
    primaryEmailAddress: { emailAddress: "agent@webooking.it" },
    publicMetadata: { role: "BOOKING_AGENT" },
    imageUrl: null,
  };
  return (
    <MockUserContext.Provider value={{ user: mockUser, isLoaded: true, isSignedIn: true }}>
      {children}
    </MockUserContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return <MockProvider>{children}</MockProvider>;
}

export function useUser() {
  return useContext(MockUserContext);
}

export function UserButton() {
  return (
    <div className="w-9 h-9 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-bold">
      MR
    </div>
  );
}

export function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">WEBOOKING</h1>
        <p className="text-sm text-slate-500 mt-2">Modalità demo — nessuna autenticazione richiesta</p>
        <a href="/dashboard" className="mt-4 inline-block px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors">
          Vai alla Dashboard
        </a>
      </div>
    </div>
  );
}
