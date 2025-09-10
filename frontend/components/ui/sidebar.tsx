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
  const [collapsed, setCollapsed] = React.useState(() => {
    // Check localStorage for persisted state
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebar-collapsed");
      return saved ? JSON.parse(saved) : defaultCollapsed;
    }
    return defaultCollapsed;
  });

  const [isMounted, setIsMounted] = React.useState(false);

  // Wait for component to mount before rendering to prevent hydration mismatch
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Persist sidebar state to localStorage
  const setCollapsedSafe = React.useCallback((newCollapsed: boolean) => {
    setCollapsed(newCollapsed);
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebar-collapsed", JSON.stringify(newCollapsed));
    }
  }, []);

  // Don't render children until component is mounted to prevent hydration issues
  if (!isMounted) {
    return null;
  }

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed: setCollapsedSafe }}
    >
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
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex items-center min-h-[60px]",
        collapsed ? "p-2" : "p-4 justify-between", // Only justify-between when expanded
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
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto",
        collapsed ? "p-1" : "p-2", // Reduced padding when collapsed
        className
      )}
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
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "border-t border-sidebar-border",
        collapsed ? "p-1" : "p-2", // Reduced padding when collapsed
        className
      )}
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
    e.preventDefault(); // Prevent any default behaviors

    if (onClick) {
      onClick(e);
    }
  };

  const content = (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg cursor-pointer transition-colors relative",
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        collapsed
          ? "justify-center px-4 py-[9px] mx-2" // Increased height in collapsed mode
          : "px-3 py-2", // Normal padding in expanded mode
        className
      )}
      onClick={handleClick}
      title={collapsed ? (children as string) : undefined} // Simple tooltip for collapsed state
      tabIndex={0} // Make it focusable but don't interfere with sidebar state
      {...props}
    >
      {icon && (
        <div
          className={cn(
            "flex-shrink-0",
            collapsed && "w-5 h-5 flex items-center justify-center" // Ensure consistent icon sizing in collapsed mode
          )}
        >
          {icon}
        </div>
      )}
      {!collapsed && <span className="truncate">{children}</span>}
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
