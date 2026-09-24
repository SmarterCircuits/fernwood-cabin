// Fetches current Smarter Circuits channel statistics from the YouTube Data
// API and records today's snapshot in src/data/channel-stats.json.
// Run by the deploy workflow on a daily schedule; needs YOUTUBE_API_KEY.
// One snapshot per UTC day: re-running on the same day replaces it.
import { readFile, writeFile } from "node:fs/promises";

const FILE = new URL("../src/data/channel-stats.json", import.meta.url);
const key = process.env.YOUTUBE_API_KEY;
if (!key) {
  console.log("YOUTUBE_API_KEY not set; keeping existing channel stats.");
  process.exit(0);
}

const data = JSON.parse(await readFile(FILE, "utf8"));
const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${data.channelId}&key=${key}`;
const res = await fetch(url);
if (!res.ok) {
  console.error(`YouTube API error ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const stats = (await res.json()).items?.[0]?.statistics;
if (!stats) {
  console.error("Channel not found in YouTube API response.");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const snapshot = {
  date: today,
  // YouTube rounds public subscriber counts to three significant figures.
  ...(stats.hiddenSubscriberCount ? {} : { subscribers: Number(stats.subscriberCount) }),
  views: Number(stats.viewCount),
  videos: Number(stats.videoCount),
  source: "YouTube Data API",
};
data.snapshots = data.snapshots.filter((s) => s.date !== today).concat(snapshot);
data.snapshots.sort((a, b) => a.date.localeCompare(b.date));
await writeFile(FILE, JSON.stringify(data, null, 2) + "\n");
console.log(`Recorded ${today}:`, snapshot);
