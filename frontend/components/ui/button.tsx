import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 shadow-lg backdrop-blur-sm relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground hover:shadow-2xl hover:shadow-primary/50 focus-visible:ring-primary/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        destructive:
          "bg-gradient-to-br from-destructive via-destructive to-destructive/80 text-white hover:shadow-2xl hover:shadow-destructive/50 focus-visible:ring-destructive/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        outline:
          "border-2 border-primary/30 bg-background/50 backdrop-blur-md hover:bg-background/80 hover:border-primary/50 hover:shadow-xl focus-visible:ring-primary/20",
        secondary:
          "bg-gradient-to-br from-secondary via-secondary to-secondary/80 text-secondary-foreground hover:shadow-2xl hover:shadow-secondary/50 focus-visible:ring-secondary/30 before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        ghost:
          "hover:bg-accent/50 backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5 focus-visible:ring-accent/20",
        link: "text-primary underline-offset-4 hover:underline shadow-none hover:shadow-none",
      },
      size: {
        default: "h-11 px-6 py-2 text-base has-[>svg]:px-5",
        sm: "h-9 rounded-full px-4 has-[>svg]:px-3.5 text-sm",
        lg: "h-14 rounded-full px-8 has-[>svg]:px-7 text-lg",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
