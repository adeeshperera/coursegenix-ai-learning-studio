"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { LogOut, Settings } from "lucide-react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

type Props = {
  user: User;
};

const UserAccountNav = ({ user }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="relative flex items-center rounded-full hover:ring-2 hover:ring-primary/20 transition"
          aria-label="Open user menu"
        >
          <UserAvatar user={user} />
          <span className="sr-only">Open user menu</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px] mt-2">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2 p-2">
            <div className="flex flex-col space-y-0.5">
              {user?.name && (
                <p className="font-medium text-sm">{user.name}</p>
              )}
              {user?.email && (
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              )}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link 
            href="/settings"
            className="flex items-center cursor-pointer"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            signOut();
          }}
          className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
