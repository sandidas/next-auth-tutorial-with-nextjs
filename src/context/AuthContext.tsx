"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
interface IProps {
  children: React.ReactNode;
  session: Session | null;
}

export default function AuthContext({ children, session }: IProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
