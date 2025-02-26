import { forwardRef ***REMOVED*** from "react";
import { cn ***REMOVED*** from "../../lib/utils";

const Card = forwardRef(({ className, ...props ***REMOVED***, ref) => (
  <div
    ref={ref***REMOVED***
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )***REMOVED***
    {...props***REMOVED***
  />
));
Card.displayName = "Card";

const CardContent = forwardRef(({ className, ...props ***REMOVED***, ref) => (
  <div ref={ref***REMOVED*** className={cn("p-6 pt-0", className)***REMOVED*** {...props***REMOVED*** />
));
CardContent.displayName = "CardContent";

export { Card, CardContent ***REMOVED***;