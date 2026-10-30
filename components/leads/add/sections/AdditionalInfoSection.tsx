import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LeadFormData } from "@/lib/types/lead";
import CollapsibleSection from "./CollapsibleSection";

interface AdditionalInfoProps {
  formData: LeadFormData;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function AdditionalInfoSection({ formData, onChange }: AdditionalInfoProps) {
  return (
    <CollapsibleSection title="Additional Information" defaultOpen={false}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="requirements" className="text-sm font-medium">Project Requirements</Label>
          <Textarea
            id="requirements"
            name="requirements"
            rows={4}
            placeholder="Describe project requirements..."
            value={formData.requirements}
            onChange={onChange}
            className="bg-card border-input resize-none focus-visible:ring-1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="text-sm font-medium">Additional Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="Additional notes..."
            value={formData.notes}
            onChange={onChange}
            className="bg-card border-input resize-none focus-visible:ring-1"
          />
        </div>
      </div>
    </CollapsibleSection>
  );
}
