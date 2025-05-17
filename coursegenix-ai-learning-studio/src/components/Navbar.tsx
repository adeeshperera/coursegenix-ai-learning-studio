"use client";

import Link from "next/link";
import { Menu, X, ChevronRight, Sparkles } from "lucide-react";
import React, { useState } from "react";
import SignInButton from "./SignInButton";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { usePathname } from "next/navigation";
import { User } from "next-auth";
import { cn } from "@/lib/utils";

interface NavbarProps {
  user?: User | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className="fixed inset-x-0 top-0 bg-background/80 backdrop-blur-sm z-50 h-16 border-b border-border transition-colors"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between h-full px-4 mx-auto max-w-7xl sm:px-8">
        {/* Logo Section */}
        <div className="flex-none">
          <Link
            href="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label="CourseGenix - Homepage"
          >
            <p className="rounded-lg border-2 border-b-4 border-r-4 border-foreground px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] dark:border-foreground">
              CourseGenix
            </p>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center md:hidden">
          <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="default"
                className="relative h-10 w-10 p-0 hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 transition-transform duration-200" />
                ) : (
                  <Menu className="h-5 w-5 transition-transform duration-200" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-[calc(100vw-2rem)] mt-2 md:hidden border-border/50 shadow-lg animate-in slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top-2"
              sideOffset={8}
            >
              <div className="px-2 py-1.5 text-xs uppercase text-muted-foreground font-medium tracking-wider">
                Navigation
              </div>
              <DropdownMenuItem asChild>
                <Link
                  href="/gallery"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center w-full px-3 py-2.5 transition-colors rounded-md",
                    isActive("/gallery") 
                      ? "bg-accent text-accent-foreground font-medium" 
                      : "hover:bg-accent/50"
                  )}
                >
                  Explore
                  <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                </Link>
              </DropdownMenuItem>
              {user && (
                <>
                  <div className="px-2 py-1.5 text-xs uppercase text-muted-foreground font-medium tracking-wider mt-2">
                    Account
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/create"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center w-full px-3 py-2.5 transition-all relative overflow-hidden rounded-md gap-2",
                        isActive("/create") 
                          ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                          : "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(110deg,#00000000,#00000000,#ffffff20,#00000000,#00000000)] dark:bg-[linear-gradient(110deg,#00000000,#00000000,#ffffff10,#00000000,#00000000)] animate-shine" />
                      <Sparkles className="h-4 w-4 shrink-0" />
                      Create Course
                      <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center w-full px-3 py-2.5 transition-colors rounded-md",
                        isActive("/settings") 
                          ? "bg-accent text-accent-foreground font-medium" 
                          : "hover:bg-accent/50"
                      )}
                    >
                      Settings
                      <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="flex items-center space-x-2">
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/gallery"
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent/50 relative",
                      isActive("/gallery")
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Explore
                    {isActive("/gallery") && (
                      <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0" />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Browse all courses</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {user && (
              <>
                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/create"
                        className={cn(
                          "group px-4 py-2 rounded-md text-sm font-medium transition-all relative overflow-hidden inline-flex items-center gap-2",
                          isActive("/create")
                            ? "bg-primary/15 text-primary ring-2 ring-primary/20 shadow-[0_0_12px_-3px] shadow-primary/20"
                            : "bg-primary/10 text-primary hover:bg-primary/15 hover:ring-2 hover:ring-primary/20 hover:shadow-[0_0_12px_-3px] hover:shadow-primary/20 hover:-translate-y-0.5"
                        )}
                      >
                        <div className="absolute inset-0 bg-[linear-gradient(110deg,#00000000,#00000000,var(--primary),#00000000,#00000000)] opacity-10 dark:opacity-15 animate-shine" />
                        <Sparkles className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                        <span className="relative">Create Course</span>
                        {isActive("/create") && (
                          <span className="absolute inset-0 bg-primary/5 mix-blend-overlay animate-pulse" />
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={4}>
                      Create a new AI-powered course
                      <span className="block text-xs text-muted-foreground mt-1">Unlock the power of AI teaching</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider delayDuration={200}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href="/settings"
                        className={cn(
                          "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent/50 relative",
                          isActive("/settings")
                            ? "text-foreground bg-accent"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        Settings
                        {isActive("/settings") && (
                          <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0" />
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>Account settings</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="h-8 w-px bg-border mx-2 hidden sm:block" />
          <div className="flex items-center">
            {user ? (
              <UserAccountNav user={user} />
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
