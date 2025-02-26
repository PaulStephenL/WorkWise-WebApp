import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn ***REMOVED*** from "../../lib/utils";

const Separator = React.forwardRef(
  (
    { className, orientation = "horizontal", decorative = true, ...props ***REMOVED***,
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref***REMOVED***
      decorative={decorative***REMOVED***
      orientation={orientation***REMOVED***
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )***REMOVED***
      {...props***REMOVED***
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator ***REMOVED***;
