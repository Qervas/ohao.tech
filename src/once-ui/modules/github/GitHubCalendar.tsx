"use client";
import { GitHubCalendarClient } from "./GitHubCalendarClient";

interface GitHubCalendarProps {
  username: string;
}

export default function GitHubCalendar({ username }: GitHubCalendarProps) {
  return <GitHubCalendarClient username={username} />;
}
