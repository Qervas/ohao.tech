"use client";

import { useState } from "react";
import { Flex, Text, Input, Badge, IconButton } from "@/once-ui/components";

interface Repo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  topics: string[];
  updated_at: string;
}

interface RepoListProps {
  repos: Repo[];
}

export default function RepoList({ repos }: RepoListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRepos = repos.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.topics?.some((topic) =>
        topic.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <Flex
      fillWidth
      gap="24"
      padding="32"
      background="surface"
      radius="l"
      direction="column"
    >
      <Flex
        fillWidth
        justifyContent="space-between"
        alignItems="center"
        gap="16"
      >
        <Text variant="heading-strong-l" onBackground="neutral-strong">
          Repositories
        </Text>
        <Input
          id="search-repos"
          label="Search repositories"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          prefixIcon="search"
          labelAsPlaceholder
          style={{ maxWidth: "300px" }}
        />
      </Flex>

      <Flex direction="column" gap="16">
        {filteredRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </Flex>
    </Flex>
  );
}

function RepoCard({ repo }: { repo: Repo }) {
  const updatedAt = new Date(repo.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Flex
      fillWidth
      direction="column"
      gap="16"
      padding="24"
      background="neutral-weak"
      radius="m"
      border="neutral-medium"
      borderStyle="solid-1"
    >
      <Flex fillWidth justifyContent="space-between" alignItems="flex-start">
        <Flex direction="column" gap="8">
          <Text
            as="a"
            href={repo.html_url}
            target="_blank"
            variant="heading-strong-m"
            onBackground="brand-strong"
          >
            {repo.name}
          </Text>
          {repo.description && (
            <Text variant="body-default-s" onBackground="neutral-medium">
              {repo.description}
            </Text>
          )}
        </Flex>
      </Flex>

      <Flex gap="16" wrap>
        {repo.topics?.map((topic) => (
          <Badge key={topic} label={topic} variant="brand" />
        ))}
      </Flex>

      <Flex gap="24">
        {repo.language && (
          <Flex gap="8" alignItems="center">
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: getLanguageColor(repo.language),
              }}
            />
            <Text variant="body-default-xs" onBackground="neutral-medium">
              {repo.language}
            </Text>
          </Flex>
        )}
        <Flex gap="8" alignItems="center">
          <IconButton icon="star" variant="ghost" size="s" />
          <Text variant="body-default-xs" onBackground="neutral-medium">
            {repo.stargazers_count}
          </Text>
        </Flex>
        <Flex gap="8" alignItems="center">
          <IconButton icon="gitFork" variant="ghost" size="s" />
          <Text variant="body-default-xs" onBackground="neutral-medium">
            {repo.forks_count}
          </Text>
        </Flex>
        <Text variant="body-default-xs" onBackground="neutral-weak">
          Updated on {updatedAt}
        </Text>
      </Flex>
    </Flex>
  );
}

// Helper function to get language colors
function getLanguageColor(language: string): string {
  const colors: { [key: string]: string } = {
    JavaScript: "#f1e05a",
    TypeScript: "#2b7489",
    Python: "#3572A5",
    Java: "#b07219",
    C: "#555555",
    "C++": "#f34b7d",
    Ruby: "#701516",
    // Add more languages as needed
  };
  return colors[language] || "#8b949e";
}
