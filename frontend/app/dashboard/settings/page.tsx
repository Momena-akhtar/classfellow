"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, Loader } from "lucide-react";

export default function SettingsPage() {
  const { student, loading: authLoading } = useAuth();
  
  // Profile form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Microphone state
  const [micPermission, setMicPermission] = useState<
    "granted" | "denied" | "prompt"
  >("prompt");
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedMicId, setSelectedMicId] = useState<string>("");
  const [sessionsCreated] = useState(42);
  const totalAllowedSessions = 100;

  // Initialize form with user data
  useEffect(() => {
    if (student && !authLoading) {
      setName(student.name || "");
      setEmail(student.email || "");
      setUniversity(student.university || "");
    }
  }, [student, authLoading]);

  const checkMicPermission = useCallback(async () => {
    try {
      const permission = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });
      setMicPermission(permission.state);

      permission.addEventListener("change", () => {
        setMicPermission(permission.state);
      });
    } catch (error) {
      console.error("Error checking microphone permission:", error);
    }
  }, []);

  const getAudioDevices = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(
        (device) => device.kind === "audioinput"
      );
      setAudioDevices(audioInputs);

      if (audioInputs.length > 0 && !selectedMicId) {
        setSelectedMicId(audioInputs[0].deviceId);
      }
    } catch (error) {
      console.error("Error getting audio devices:", error);
    }
  }, [selectedMicId]);

  useEffect(() => {
    const initializeDevices = async () => {
      await checkMicPermission();
      await getAudioDevices();
    };
    void initializeDevices();
  }, [checkMicPermission, getAudioDevices]);

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicPermission("granted");
      await getAudioDevices();
    } catch (error) {
      console.error("Microphone permission denied:", error);
      setMicPermission("denied");
    }
  };

  const handleMicrophoneChange = (deviceId: string) => {
    setSelectedMicId(deviceId);
  };

  const handleSaveProfile = async () => {
    if (!student) return;

    setIsSaving(true);
    setSaveMessage(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            email,
            university,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSaveMessage({
          type: "success",
          text: "Profile updated successfully",
        });
      } else {
        setSaveMessage({
          type: "error",
          text: data.message || "Failed to update profile",
        });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setSaveMessage({
        type: "error",
        text: "Error saving profile. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading settings...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 bg-slate-400">
                    <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                      {student?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{student?.name}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                  />
                </div>

                {saveMessage && (
                  <Alert variant={saveMessage.type === "success" ? "default" : "destructive"}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{saveMessage.text}</AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Password & Authentication</CardTitle>
                <CardDescription>
                  Manage your password and two-factor authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>
                  Choose what email notifications you&apos;d like to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Session Reminders</p>
                    <p className="text-xs text-muted-foreground">
                      Get notified when a session completes
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Marketing Emails</p>
                    <p className="text-xs text-muted-foreground">
                      Product updates, tips, and promotional content
                    </p>
                  </div>
                  <Switch checked={false} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>
                  Manage push notifications on your devices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Session Alerts</p>
                    <p className="text-xs text-muted-foreground">
                      Real-time alerts for upcoming sessions
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Recording Complete</p>
                    <p className="text-xs text-muted-foreground">
                      Notifications when recordings are processed and ready
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Session Settings */}
          <TabsContent value="sessions" className="space-y-6">
            {/* Microphone Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Microphone Settings</CardTitle>
                <CardDescription>
                  Configure microphone permissions and device selection
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Microphone Permission</p>
                    <p className="text-xs text-muted-foreground">
                      Allow access to your microphone for recording sessions
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex text-sm items-center space-x-2 border-[1px] border-primary text-primary px-3 py-[5px] rounded-md">
                      {micPermission === "granted"
                        ? "Enabled"
                        : micPermission === "denied"
                        ? "Disabled"
                        : "Not Set"}
                    </div>
                    {micPermission !== "granted" && (
                      <Button size="sm" onClick={requestMicPermission}>
                        Grant Permission
                      </Button>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="microphone-select">Select Microphone</Label>
                  <select
                    id="microphone-select"
                    value={selectedMicId}
                    onChange={(e) => handleMicrophoneChange(e.target.value)}
                    className="w-full p-2 border border-input bg-background rounded-md text-sm disabled:opacity-50"
                    disabled={
                      micPermission !== "granted" || audioDevices.length === 0
                    }
                  >
                    {audioDevices.length === 0 ? (
                      <option value="">No microphones available</option>
                    ) : (
                      audioDevices.map((device) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          {device.label ||
                            `Microphone ${device.deviceId.substring(0, 8)}`}
                        </option>
                      ))
                    )}
                  </select>
                  {micPermission !== "granted" && (
                    <p className="text-xs text-muted-foreground">
                      Grant microphone permission to see available devices
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Session Usage */}
            <Card>
              <CardHeader>
                <CardTitle>Session Usage</CardTitle>
                <CardDescription>
                  Track your session creation and remaining quota
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Sessions Created</span>
                    <span className="font-medium">
                      {sessionsCreated} of {totalAllowedSessions}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          (sessionsCreated / totalAllowedSessions) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0 sessions</span>
                    <span>
                      {totalAllowedSessions - sessionsCreated} remaining
                    </span>
                    <span>{totalAllowedSessions} total</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
