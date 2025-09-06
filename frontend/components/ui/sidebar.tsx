"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  defaultCollapsed = false,
}) => {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  className,
  ...props
}) => {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex items-center justify-between p-4", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("flex-1 overflow-y-auto p-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn("p-2 border-t border-sidebar-border", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <nav
      className={cn("flex flex-col space-y-1", className)}
      {...props}
    >
      {children}
    </nav>
  );
};

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
  href?: string;
}

export const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  children,
  className,
  active = false,
  icon,
  href,
  onClick,
  ...props
}) => {
  const { collapsed } = useSidebar();

  const content = (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        active && "bg-sidebar-primary text-sidebar-primary-foreground",
        collapsed && "justify-center",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <div className="flex-shrink-0">
          {icon}
        </div>
      )}
      {!collapsed && (
        <span className="truncate">{children}</span>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
};

interface SidebarToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export const SidebarToggle: React.FC<SidebarToggleProps> = ({
  className,
  icon,
  ...props
}) => {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={() => setCollapsed(!collapsed)}
      {...props}
    >
      {icon || (
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
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <line x1="9" x2="9" y1="3" y2="21" />
        </svg>
      )}
    </Button>
  );
};
