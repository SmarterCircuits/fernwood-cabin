import stats from "@/data/channel-stats.json";

interface Snapshot {
  date: string; // "YYYY-MM-DD", or "YYYY-MM" for a month-level figure
  subscribers?: number;
  views?: number;
  videos?: number;
  approximate?: boolean;
  source?: string;
}

const DAY = 86_400_000;
const toTime = (d: string) => Date.parse(d.length === 7 ? `${d}-01` : d);

/**
 * Latest channel numbers plus subscriber growth. Growth uses the rolling
 * 12 months once a year of history exists; before that it is measured from
 * the earliest recorded snapshot (at least a week back), and says so.
 */
export function getChannelStats() {
  const snaps = [...(stats.snapshots as Snapshot[])].sort((a, b) => toTime(a.date) - toTime(b.date));
  const latest = [...snaps].reverse().find((s) => s.views !== undefined || s.subscribers !== undefined);
  if (!latest) return null;

  let growth: { percent: number; since: string; label: string; approximate: boolean } | null = null;
  const withSubs = snaps.filter((s) => s.subscribers !== undefined && s !== latest);
  if (latest.subscribers !== undefined && withSubs.length) {
    const now = toTime(latest.date);
    const yearAgo = withSubs.find((s) => Math.abs(now - toTime(s.date) - 365 * DAY) <= 20 * DAY);
    const base = yearAgo ?? withSubs[0];
    if (now - toTime(base.date) >= 7 * DAY) {
      growth = {
        percent: ((latest.subscribers - base.subscribers!) / base.subscribers!) * 100,
        since: base.date,
        label: yearAgo ? "past 12 months" : "",
        approximate: Boolean(base.approximate),
      };
    }
  }

  return { channel: stats.channel, channelId: stats.channelId, latest, growth };
}
