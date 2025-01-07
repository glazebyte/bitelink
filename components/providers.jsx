"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ session, children }) {
  return (
    <SessionProvider session={session}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster />
        {children}
      </NextThemesProvider>
    </SessionProvider>
  );
}
