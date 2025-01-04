"use client";

import { Flex, Text } from "@/once-ui/components";
import { useEffect, useState } from "react";
import styles from "./GitHubCalendar.module.scss";

interface GitHubCalendarClientProps {
  username: string;
}

export function GitHubCalendarClient({ username }: GitHubCalendarClientProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load GitHub calendar script
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js";
    script.async = true;
    document.body.appendChild(script);

    // Load CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://unpkg.com/github-calendar@latest/dist/github-calendar-responsive.css";
    document.head.appendChild(link);

    script.onload = () => {
      // @ts-ignore
      GitHubCalendar(".calendar", username, {
        responsive: true,
        tooltips: true,
        global_stats: false, // Disable global stats
      });
      setLoading(false);
    };

    script.onerror = () => {
      setError("Failed to load GitHub calendar");
      setLoading(false);
    };

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, [username]);

  return (
    <Flex
      fillWidth
      gap="24"
      padding="32"
      background="surface"
      radius="l"
      direction="column"
    >
      <Text variant="heading-strong-l" onBackground="neutral-strong">
        Contribution Calendar
      </Text>

      {loading && (
        <Text variant="body-default-m" onBackground="neutral-medium">
          Loading calendar...
        </Text>
      )}

      {error && (
        <Text variant="body-default-m" onBackground="danger-medium">
          {error}
        </Text>
      )}

      <div
        className={`calendar ${styles.calendar}`}
        style={{ width: "100%" }}
      ></div>
    </Flex>
  );
}
