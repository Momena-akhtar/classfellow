"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(
  undefined
);

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
        "flex h-full flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64",
        className
      )}
      data-collapsed={collapsed}
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
      className={cn(
        "flex items-center justify-between p-4 min-h-[60px]",
        className
      )}
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
    <div className={cn("flex-1 overflow-y-auto p-2", className)} {...props}>
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
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent event bubbling
    if (onClick) {
      onClick(e);
    }
  };

  const content = (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors relative group",
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed && "justify-center px-2",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      {!collapsed && <span className="truncate">{children}</span>}
      
      {/* Tooltip for collapsed state */}
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {children}
        </div>
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
      className={cn("h-8 w-8 flex-shrink-0", className)}
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
          {collapsed ? (
            <>
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="15" x2="15" y1="3" y2="21" />
            </>
          ) : (
            <>
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="9" x2="9" y1="3" y2="21" />
            </>
          )}
        </svg>
      )}
    </Button>
  );
};
