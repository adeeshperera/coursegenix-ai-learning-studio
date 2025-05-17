import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Provider } from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";
import { getAuthSession } from "@/lib/auth";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CourseGenix AI Learning Studio",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <body className={cn(lexend.className, "antialiased min-h-screen pt-16")}>
        <Provider>
          <Navbar user={session?.user} />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
