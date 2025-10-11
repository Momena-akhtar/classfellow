import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 backdrop-blur-sm relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground focus-visible:ring-primary/30 hover:bg-primary/90",
        destructive:
          "bg-destructive text-primary-foreground focus-visible:ring-destructive/30 hover:bg-destructive/90",
        outline:
          "border-2 border-primary/70 bg-primary/10 hover:bg-background/80 hover:border-primary/40 hover:bg-secondary focus-visible:ring-primary/20",
        secondary:
          "bg-secondary hover:bg-secondary/80 focus-visible:ring-secondary/20",
        ghost:
          "border-2 border-accent hover:bg-background focus-visible:ring-accent/20 hover:bg-accent",
        link: "text-primary underline-offset-4 hover:underline shadow-none hover:shadow-none",
      },
      size: {
        default: "h-11 px-6 py-1 text-base has-[>svg]:px-5",
        sm: "h-9 px-4 has-[>svg]:px-3.5 text-sm",
        lg: "h-14 px-8 has-[>svg]:px-7 text-lg",
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
