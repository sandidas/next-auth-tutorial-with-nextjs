"use client";
import React from "react";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

const providers = [
  { providerName: "github", Icon: "" },
  { providerName: "google", Icon: "" },
];

export default function LoginProvider() {
  const handleOAuthSignIn = (provider: string) => {
    signIn(provider);
  };

  return (
    <div>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          {providers.map((provider, index) => (
            <Button key={index} variant="outline" className="capitalize" onClick={() => handleOAuthSignIn(provider?.providerName)}>
              {/* <Icons.google className="mr-2 h-4 w-4" /> */}
              {provider?.providerName}
            </Button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
