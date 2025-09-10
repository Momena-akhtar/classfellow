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
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [micPermission, setMicPermission] = useState<
    "granted" | "denied" | "prompt"
  >("prompt");
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedMicId, setSelectedMicId] = useState<string>("");
  const [sessionsCreated, setSessionsCreated] = useState(42); // Mock data, replace with actual value
  const totalAllowedSessions = 100;

  useEffect(() => {
    checkMicPermission();
    getAudioDevices();
  }, []);

  const checkMicPermission = async () => {
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
  };

  const getAudioDevices = async () => {
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
  };

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately as we just need permission
      stream.getTracks().forEach((track) => track.stop());

      setMicPermission("granted");
      // Refresh device list to get labeled devices
      await getAudioDevices();
    } catch (error) {
      console.error("Microphone permission denied:", error);
      setMicPermission("denied");
    }
  };

  const handleMicrophoneChange = (deviceId: string) => {
    setSelectedMicId(deviceId);
  };

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
                  <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-semibold">
                    CF
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="firstName">Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <Input
                    id="university"
                    defaultValue="University of Technology"
                  />
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
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
