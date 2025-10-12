"use client";

import React from "react";

// Core UI components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MicWaveform from "@/components/ui/mic-waveform";
import OAuthButtons from "@/components/ui/oauth-buttons";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarToggle,
} from "@/components/ui/sidebar";
import { Topbar } from "@/components/ui/topbar";

import { useForm } from "react-hook-form";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Example usage</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

export default function ComponentsShowcasePage() {
  const form = useForm<{ email: string }>({
    defaultValues: { email: "" },
    mode: "onChange",
  });

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">UI Components</h1>
        <p className="text-muted-foreground mt-1">
          A quick showcase of everything in components/ui.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Section title="Button">
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="icon button">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16"></path>
                <path d="M12 6v6l4 2"></path>
              </svg>
            </Button>
          </div>
        </Section>

        <Section title="Badge">
          <div className="flex flex-wrap gap-2 items-center">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </Section>

        <Section title="Alert">
          <div className="space-y-3">
            <Alert>
              <AlertTitle>Heads up</AlertTitle>
              <AlertDescription>This is a simple alert.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong.</AlertDescription>
            </Alert>
          </div>
        </Section>

        <Section title="Card">
          <Card className="border">
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>Small description goes here.</CardDescription>
              <CardAction>
                <Button size="sm" variant="outline">
                  Action
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Card content area</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Primary</Button>
            </CardFooter>
          </Card>
        </Section>

        <Section title="Dialog">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  Short description of what this dialog is about.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <Label htmlFor="dialog-input">Your name</Label>
                <Input id="dialog-input" placeholder="Type here" />
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Dropdown Menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        <Section title="Form + Input + Label + Message">
          <Form {...form}>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <Button type="submit">Submit</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </Section>

        <Section title="Textarea">
          <Textarea placeholder="Write something..." />
        </Section>

        <Section title="Switch">
          <div className="flex items-center gap-3">
            <Switch id="switch-1" />
            <Label htmlFor="switch-1">Enable feature</Label>
          </div>
        </Section>

        <Section title="Progress">
          <Progress value={66} />
        </Section>

        <Section title="Select">
          <Select defaultValue="apple">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectSeparator />
                <SelectItem value="grapes">Grapes</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Section>

        <Section title="Tabs">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <p className="text-sm text-muted-foreground">
                Account tab content.
              </p>
            </TabsContent>
            <TabsContent value="billing">
              <p className="text-sm text-muted-foreground">
                Billing tab content.
              </p>
            </TabsContent>
            <TabsContent value="team">
              <p className="text-sm text-muted-foreground">Team tab content.</p>
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="Avatar + Separator">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="" alt="avatar" />
              <AvatarFallback>CF</AvatarFallback>
            </Avatar>
            <Separator orientation="vertical" />
            <div>
              <p className="text-sm font-medium">ClassFellow</p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
          </div>
        </Section>

        <Section title="OAuth Buttons">
          <OAuthButtons />
        </Section>

        <Section title="Mic Waveform">
          <p className="text-xs text-muted-foreground">
            Requires microphone permission for live waveform.
          </p>
          <MicWaveform />
        </Section>

        <Section title="Topbar">
          <div className="border rounded-md overflow-hidden">
            <Topbar title="Demo Topbar" />
          </div>
        </Section>

        <Section title="Navigation Menu">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-2 p-2 md:w-[400px]">
                    <NavigationMenuLink href="#">Item One</NavigationMenuLink>
                    <NavigationMenuLink href="#">Item Two</NavigationMenuLink>
                    <NavigationMenuLink href="#">Item Three</NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className="px-3 py-2 rounded-md">
                  Docs
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Section>

        <Section title="Sidebar">
          <div className="h-56 border rounded-md overflow-hidden">
            <SidebarProvider>
              <div className="flex h-full">
                <Sidebar>
                  <SidebarHeader>
                    <SidebarToggle />
                  </SidebarHeader>
                  <SidebarContent>
                    <SidebarMenu>
                      <SidebarMenuItem active>Dashboard</SidebarMenuItem>
                      <SidebarMenuItem>Courses</SidebarMenuItem>
                      <SidebarMenuItem>Sessions</SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarContent>
                  <SidebarFooter>
                    <div className="text-xs text-muted-foreground">v1.0.0</div>
                  </SidebarFooter>
                </Sidebar>
                <div className="flex-1 p-4">
                  <p className="text-sm text-muted-foreground">
                    Toggle the sidebar to see collapsed state.
                  </p>
                </div>
              </div>
            </SidebarProvider>
          </div>
        </Section>
      </div>
    </div>
  );
}
