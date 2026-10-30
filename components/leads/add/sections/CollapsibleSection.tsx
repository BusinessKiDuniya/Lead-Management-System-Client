"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
  id?: string;
}

export default function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
  badge,
  className,
  id,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      id={id}
      className={cn(
        "border border-border rounded-xl bg-card/60 shadow-xs transition-all duration-200 overflow-hidden",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-6 py-5 text-left select-none cursor-pointer hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold tracking-wide text-foreground">
            {title}
          </span>
          {badge}
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="px-6 pb-6 pt-3 border-t border-border/40">
          {children}
        </div>
      )}
    </div>
  );
}

