"use client";

import type React from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const allowedEmail = process.env.NEXT_PUBLIC_FIREBASE_EMAIL_ALLOWED;
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userEmail = result.user.email;

      if (userEmail === allowedEmail) {
        setUser(result.user);
        router.push("/admin");
      } else {
        setError("Access denied. Your email is not authorized.");
        setIsLoading(false);
        await signOut(auth);
      }
    } catch (err) {
      console.error("Error during Google login:", err);
      setError("An error occurred while logging in. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center mt-4">
          <div className="flex justify-center mb-2">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Login to access the admin dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md text-center">
              {error}
            </div>
          )}
          <Button
            variant="outline"
            onClick={handleLoginWithGoogle}
            className="w-full cursor-pointer flex items-center gap-2"
            disabled={isLoading}
          >
            <Image src="/google.svg" alt="Google Logo" width={15} height={15} />
            {isLoading ? "Loading..." : "Continue with Google"}
          </Button>
        </CardContent>
        <CardFooter />
      </Card>
    </div>
  );
}
