import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeadFormData } from "@/lib/types/lead";
import { TimePicker } from "@/components/ui/time-picker";
import CollapsibleSection from "./CollapsibleSection";

interface FollowUpProps {
  formData: LeadFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (field: string, value: string) => void;
}

export default function FollowUpSection({ formData, onChange, onSelectChange }: FollowUpProps) {
  return (
    <CollapsibleSection title="Follow Up Information" defaultOpen={false}>
      <div className="grid gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-2">
          <Label htmlFor="followUpDate" className="text-sm font-medium">Follow Up Date</Label>
          <Input
            id="followUpDate"
            type="date"
            name="followUpDate"
            value={formData.followUpDate}
            onChange={onChange}
            onClick={(e) => e.currentTarget.showPicker?.()}
            className="h-10 bg-card border-input focus-visible:ring-1 cursor-pointer w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="followUpTime" className="text-sm font-medium">Follow Up Time</Label>
          <TimePicker
            id="followUpTime"
            name="followUpTime"
            value={formData.followUpTime}
            onChange={(val) => onSelectChange("followUpTime", val)}
            placeholder="Select time"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Priority</Label>
          <Select onValueChange={(v) => onSelectChange("priority", v)} value={formData.priority}>
            <SelectTrigger id="priority" className="h-10 bg-card border-input">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="w-[--radix-select-trigger-width]">
              <SelectItem value="unknown">Unknown</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Contact Method</Label>
          <Select onValueChange={(v) => onSelectChange("contactMethod", v)} value={formData.contactMethod}>
            <SelectTrigger id="contactMethod" className="h-10 bg-card border-input">
              <SelectValue placeholder="Contact Method" />
            </SelectTrigger>
            <SelectContent position="popper" sideOffset={4} className="w-[--radix-select-trigger-width]">
              <SelectItem value="call">Call</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="meeting">Meeting</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </CollapsibleSection>
  );
}
