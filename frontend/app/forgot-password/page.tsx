"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";

type Step = "email" | "otp" | "reset";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [passwords, setPasswords] = useState({ password: "", confirm: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    if (showSuccess) {
      const t = setTimeout(() => router.push("/login"), 1500);
      return () => clearTimeout(t);
    }
  }, [showSuccess, router]);

  const handleOtpChange = (index: number, value: string) => {
    const sanitized = value.replace(/\D/g, "");
    const next = [...otp];
    next[index] = sanitized.slice(-1);
    setOtp(next);

    if (sanitized && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // Clear current value first
        const next = [...otp];
        next[index] = "";
        setOtp(next);
        return;
      }
      if (index > 0) {
        otpRefs.current[index - 1]?.focus();
        const next = [...otp];
        next[index - 1] = "";
        setOtp(next);
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleEmailEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (email) {
        void handleSendOtp();
      }
    }
  };

  const handleOtpEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      void handleVerifyOtp();
    }
  };

  const handleResetEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (passwords.password && passwords.confirm) {
        void handleResetPassword();
      }
    }
  };

  const handleSendOtp = async () => {
    try {
      setError(null);
      setInfo(null);
      setIsSending(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/email/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to send OTP");
      }
      setInfo("OTP sent to your email.");
      setStep("otp");
    } catch (err: any) {
      setError(err?.message || "Failed to send OTP");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setError(null);
      setInfo(null);
      setIsVerifying(true);
      const code = otp.join("");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/email/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify({ email, otp: code }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to verify OTP");
      }
      setInfo("OTP verified.");
      setStep("reset");
    } catch (err: any) {
      setError(err?.message || "Failed to verify OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    await handleSendOtp();
  };

  const handleResetPassword = async () => {
    try {
      setError(null);
      setInfo(null);

      // Validation
      if (!passwords.password || !passwords.confirm) {
        setError("Please fill in both password fields");
        return;
      }

      if (passwords.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }

      if (passwords.password !== passwords.confirm) {
        setError("Passwords do not match");
        return;
      }

      setIsResetting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "application/json" },
        body: JSON.stringify({ 
          email, 
          otp: otp.join(""), 
          password: passwords.password 
        }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.message || "Failed to reset password");
      }
      setInfo("Password reset successfully!");
      setShowSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Failed to reset password");
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Image src="/images/logo.svg" width={60} height={60} alt="ClassFellow Logo" />
          </Link>
          <h1 className="text-2xl font-bold mb-2">Forgot your password?</h1>
          <p className="text-muted-foreground">Follow the steps to reset it</p>
        </div>

        <Tabs value={step} onValueChange={() => {}} className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="email" disabled>
              1. Email
            </TabsTrigger>
            <TabsTrigger value="otp" disabled>
              2. OTP
            </TabsTrigger>
            <TabsTrigger value="reset" disabled>
              3. Reset
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardDescription>Enter your account email to receive a reset code</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4" onKeyDown={handleEmailEnter}>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  {info && <p className="text-sm text-green-600">{info}</p>}
                  <Button className="w-full" onClick={handleSendOtp} disabled={!email || isSending}>
                    {isSending ? "Sending..." : "Send reset OTP"}
                  </Button>
                </div>
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    Remembered your password?{" "}
                    <Link href="/login" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="otp">
            <Card>
              <CardHeader>
                <CardDescription>Enter the 6-digit OTP sent to {email || "your email"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6" onKeyDown={handleOtpEnter}>
                  <div className="flex items-center justify-between gap-2">
                    {otp.map((digit, idx) => (
                      <Input
                        key={idx}
                        ref={(el) => {
                          otpRefs.current[idx] = el;
                        }}
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="text-center [appearance:textfield] w-12 h-12"
                      />
                    ))}
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  {info && <p className="text-sm text-green-600">{info}</p>}
                  <Button className="w-full" onClick={handleVerifyOtp} disabled={isVerifying}>
                    {isVerifying ? "Verifying..." : "Verify OTP"}
                  </Button>
                  <div className="text-center">
                    <button className="text-sm text-primary hover:underline" type="button" onClick={handleResend} disabled={isSending}>
                      Resend code
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reset">
            <Card>
              <CardHeader>
                <CardDescription>Set a new password for your account</CardDescription>
              </CardHeader>
              <CardContent>
                {!showSuccess ? (
                  <div className="space-y-4" onKeyDown={handleResetEnter}>
                    <div className="space-y-2">
                      <Label htmlFor="password">New password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter new password"
                        value={passwords.password}
                        onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm">Confirm new password</Label>
                      <Input
                        id="confirm"
                        type="password"
                        placeholder="Re-enter new password"
                        value={passwords.confirm}
                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {info && <p className="text-sm text-green-600">{info}</p>}
                    <Button className="w-full" onClick={handleResetPassword} disabled={!passwords.password || !passwords.confirm || isResetting}>
                      {isResetting ? "Resetting..." : "Reset password"}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="flex items-center justify-center mb-3">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <p className="font-medium mb-2">Password reset successfully</p>
                    <p className="text-sm text-muted-foreground">Redirecting to sign in…</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


