"use client";

import { Flex, IconButton, Text } from "@/once-ui/components";

interface GitHubStatsProps {
  user: {
    public_repos: number;
    followers: number;
    public_gists: number;
    created_at: string;
  };
}

export default function GitHubStats({ user }: GitHubStatsProps) {
  const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
        GitHub Statistics
      </Text>

      <Flex gap="24" justifyContent="space-between">
        <StatCard
          title="Total Repositories"
          value={user.public_repos}
          icon="repository"
        />
        <StatCard title="Followers" value={user.followers} icon="users" />
        <StatCard title="Public Gists" value={user.public_gists} icon="code" />
        <StatCard title="Joined GitHub" value={joinedDate} icon="calendar" />
      </Flex>
    </Flex>
  );
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: string;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Flex
      direction="column"
      gap="8"
      padding="16"
      background="neutral-weak"
      radius="m"
      alignItems="center"
      style={{ minWidth: "200px" }}
    >
      <IconButton icon={icon} variant="ghost" size="l" />
      <Text variant="heading-strong-l" onBackground="neutral-strong">
        {value}
      </Text>
      <Text variant="body-default-s" onBackground="neutral-medium">
        {title}
      </Text>
    </Flex>
  );
}
