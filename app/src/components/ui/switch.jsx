import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-8 w-16 shrink-0 items-center rounded-full border border-gray-700 shadow-xs transition-all outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-indigo-600 data-[state=unchecked]:bg-[#060010]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "block h-7 w-7 rounded-full bg-white transition-transform",
          // For h-8 (32px) track and w-7 (28px) thumb: 32-28=4px slide + 4px left padding = 36px = 2.25rem
          "data-[state=checked]:translate-x-[2.25rem]",
          "data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}


export { Switch };
