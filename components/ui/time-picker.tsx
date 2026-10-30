"use client";

import * as React from "react";
import { Clock, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value?: string; // "HH:mm" in 24h format, e.g. "14:30"
  onChange: (value: string) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
}

export function TimePicker({
  value,
  onChange,
  id,
  name,
  placeholder = "Select follow up time",
  className,
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Parse 24h "HH:mm" into 12h parts
  const parsed = React.useMemo(() => {
    if (!value || !value.includes(":")) {
      return { hour12: 10, minute: 0, period: "AM" as "AM" | "PM" };
    }
    const [hStr, mStr] = value.split(":");
    let h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10) || 0;
    if (isNaN(h)) h = 10;
    const period: "AM" | "PM" = h >= 12 ? "PM" : "AM";
    let hour12 = h % 12;
    if (hour12 === 0) hour12 = 12;
    return { hour12, minute: m, period };
  }, [value]);

  const [selectedHour, setSelectedHour] = React.useState<number>(parsed.hour12);
  const [selectedMinute, setSelectedMinute] = React.useState<number>(parsed.minute);
  const [period, setPeriod] = React.useState<"AM" | "PM">(parsed.period);
  const [mode, setMode] = React.useState<"hours" | "minutes">("hours");

  // Keep internal state synced when value prop updates
  React.useEffect(() => {
    setSelectedHour(parsed.hour12);
    setSelectedMinute(parsed.minute);
    setPeriod(parsed.period);
  }, [parsed]);

  // Convert 12h to 24h string
  const commitTime = (h: number, m: number, p: "AM" | "PM") => {
    let hour24 = h % 12;
    if (p === "PM") hour24 += 12;
    const hFormatted = String(hour24).padStart(2, "0");
    const mFormatted = String(m).padStart(2, "0");
    onChange(`${hFormatted}:${mFormatted}`);
  };

  const handleHourSelect = (h: number) => {
    setSelectedHour(h);
    commitTime(h, selectedMinute, period);
    // Smooth auto-transition to minutes mode
    setMode("minutes");
  };

  const handleMinuteSelect = (m: number) => {
    setSelectedMinute(m);
    commitTime(selectedHour, m, period);
  };

  const handlePeriodChange = (p: "AM" | "PM") => {
    setPeriod(p);
    commitTime(selectedHour, selectedMinute, p);
  };

  const handlePresetSelect = (h24: number, m: number) => {
    const p: "AM" | "PM" = h24 >= 12 ? "PM" : "AM";
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;
    setSelectedHour(h12);
    setSelectedMinute(m);
    setPeriod(p);
    commitTime(h12, m, p);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
  };

  // Clock Geometry (center = 100, radius = 70)
  const dialRadius = 72;
  const dialCenter = 100;

  // Angle calculations for clock hands
  const hourAngle = ((selectedHour % 12) * 30 - 90) * (Math.PI / 180);
  const minuteAngle = (selectedMinute * 6 - 90) * (Math.PI / 180);
  const activeAngle = mode === "hours" ? hourAngle : minuteAngle;

  const handEndX = dialCenter + dialRadius * Math.cos(activeAngle);
  const handEndY = dialCenter + dialRadius * Math.sin(activeAngle);

  // Formatted display for trigger
  const displayLabel = React.useMemo(() => {
    if (!value) return null;
    const hStr = String(selectedHour).padStart(2, "0");
    const mStr = String(selectedMinute).padStart(2, "0");
    return `${hStr}:${mStr} ${period}`;
  }, [value, selectedHour, selectedMinute, period]);

  // Hours: 1 to 12
  const hoursList = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  // Minutes: 00, 05, 10, ..., 55
  const minutesList = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative w-full">
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-md border border-input bg-card px-3 text-sm text-foreground shadow-sm transition-colors cursor-pointer text-left hover:bg-muted/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              !displayLabel && "text-muted-foreground",
              className
            )}
          >
            <span className="font-medium">
              {displayLabel || placeholder}
            </span>
            <div className="flex items-center gap-1.5">
              {value && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={handleClear}
                  className="rounded p-0.5 text-muted-foreground hover:text-foreground hover:bg-muted"
                  title="Clear time"
                >
                  <X className="h-3.5 w-3.5" />
                </span>
              )}
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </button>
        </PopoverTrigger>
        <input type="hidden" name={name} value={value || ""} />
      </div>

      <PopoverContent
        align="start"
        className="w-[280px] p-4 bg-popover border border-border shadow-xl rounded-xl space-y-4 select-none"
      >
        {/* Digital display & mode switch */}
        <div className="flex items-center justify-between bg-muted/30 p-2 rounded-lg border border-border/60">
          <div className="flex items-center gap-1 font-mono text-2xl font-bold">
            <button
              type="button"
              onClick={() => setMode("hours")}
              className={cn(
                "px-2 py-0.5 rounded transition-colors cursor-pointer",
                mode === "hours"
                  ? "bg-(--button-primary) text-white font-black"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {String(selectedHour).padStart(2, "0")}
            </button>
            <span className="text-muted-foreground font-semibold">:</span>
            <button
              type="button"
              onClick={() => setMode("minutes")}
              className={cn(
                "px-2 py-0.5 rounded transition-colors cursor-pointer",
                mode === "minutes"
                  ? "bg-(--button-primary) text-white font-black"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {String(selectedMinute).padStart(2, "0")}
            </button>
          </div>

          {/* AM / PM toggle */}
          <div className="flex border border-border rounded-md overflow-hidden bg-background text-xs font-bold">
            <button
              type="button"
              onClick={() => handlePeriodChange("AM")}
              className={cn(
                "px-2.5 py-1.5 cursor-pointer transition-colors",
                period === "AM"
                  ? "bg-(--button-primary) text-white"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              AM
            </button>
            <button
              type="button"
              onClick={() => handlePeriodChange("PM")}
              className={cn(
                "px-2.5 py-1.5 cursor-pointer transition-colors",
                period === "PM"
                  ? "bg-(--button-primary) text-white"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              PM
            </button>
          </div>
        </div>

        {/* Circular Clock Face */}
        <div className="relative mx-auto h-[200px] w-[200px] rounded-full border border-border bg-card shadow-inner flex items-center justify-center">
          {/* Center Pivot */}
          <div className="absolute z-20 h-2.5 w-2.5 rounded-full bg-(--button-primary)" />

          {/* Clock Hand SVG */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none z-10"
            viewBox="0 0 200 200"
          >
            <line
              x1={dialCenter}
              y1={dialCenter}
              x2={handEndX}
              y2={handEndY}
              stroke="var(--button-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx={handEndX}
              cy={handEndY}
              r="15"
              fill="var(--button-primary)"
              opacity="0.25"
            />
          </svg>

          {/* Clock Numbers */}
          {mode === "hours" ? (
            hoursList.map((h) => {
              const angle = ((h % 12) * 30 - 90) * (Math.PI / 180);
              const x = dialCenter + dialRadius * Math.cos(angle);
              const y = dialCenter + dialRadius * Math.sin(angle);
              const isSelected = selectedHour === h;

              return (
                <button
                  key={h}
                  type="button"
                  onClick={() => handleHourSelect(h)}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className={cn(
                    "absolute z-20 h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold transition-transform cursor-pointer",
                    isSelected
                      ? "bg-(--button-primary) text-white shadow-md scale-110"
                      : "text-foreground hover:bg-muted hover:scale-105"
                  )}
                >
                  {h}
                </button>
              );
            })
          ) : (
            minutesList.map((m) => {
              const angle = (m * 6 - 90) * (Math.PI / 180);
              const x = dialCenter + dialRadius * Math.cos(angle);
              const y = dialCenter + dialRadius * Math.sin(angle);
              const isSelected = selectedMinute === m;

              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleMinuteSelect(m)}
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className={cn(
                    "absolute z-20 h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-transform cursor-pointer",
                    isSelected
                      ? "bg-(--button-primary) text-white shadow-md scale-110"
                      : "text-foreground hover:bg-muted hover:scale-105"
                  )}
                >
                  {String(m).padStart(2, "0")}
                </button>
              );
            })
          )}
        </div>

        {/* Quick Presets */}
        <div className="space-y-1.5 pt-1 border-t border-border/50">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Times
          </p>
          <div className="flex flex-wrap gap-1">
            {[
              { label: "10 AM", h: 10, m: 0 },
              { label: "12 PM", h: 12, m: 0 },
              { label: "2 PM", h: 14, m: 0 },
              { label: "4 PM", h: 16, m: 0 },
              { label: "6 PM", h: 18, m: 0 },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handlePresetSelect(p.h, p.m)}
                className="px-2 py-1 text-[11px] font-medium rounded bg-muted/50 hover:bg-muted text-foreground transition-colors cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Done Button */}
        <div className="flex justify-end pt-1">
          <Button
            type="button"
            size="sm"
            onClick={() => setOpen(false)}
            className="h-8 px-4 text-xs font-semibold bg-(--button-primary) text-white hover:opacity-90"
          >
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

