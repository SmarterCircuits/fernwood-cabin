import { materialStatusMeta, phaseStatusMeta, sponsorStatusMeta } from "@/lib/status";
import type { MaterialStatus, PhaseStatus, SponsorStatus } from "@/lib/types";

export function SponsorChip({ status, label }: { status: SponsorStatus; label?: string }) {
  const meta = sponsorStatusMeta[status];
  return (
    <span className={`chip chip--${meta.tone}`} title={meta.help}>
      {label ?? meta.label}
    </span>
  );
}

export function MaterialChip({ status }: { status: MaterialStatus }) {
  const meta = materialStatusMeta[status];
  return <span className={`chip chip--${meta.tone}`}>{meta.label}</span>;
}

export function PhaseChip({ status }: { status: PhaseStatus }) {
  const meta = phaseStatusMeta[status];
  return <span className={`chip chip--${meta.tone}`}>{meta.label}</span>;
}
