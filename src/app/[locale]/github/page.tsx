import { Flex, Text } from "@/once-ui/components";
import { baseURL, renderContent } from "@/app/resources";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import {
  GitHubCalendar,
  GitHubStats,
  RepoList,
  UserProfile,
  GitHubAchievements,
} from "@/once-ui/modules";

const GITHUB_USERNAME = "Qervas";

// Move data fetching to a separate function
async function getGitHubData() {
  try {
    const userRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      },
    );

    if (!userRes.ok || !reposRes.ok) {
      throw new Error("Failed to fetch GitHub data");
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    return {
      user: userData,
      repos: reposData,
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return {
      user: null,
      repos: [],
    };
  }
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();
  const { github } = renderContent(t);

  return {
    title: github.title,
    description: github.description,
    openGraph: {
      title: github.title,
      description: github.description,
      url: `https://${baseURL}/${locale}/github`,
    },
  };
}

export default async function GitHub({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();
  const { github, person } = renderContent(t);

  // Fetch data
  const { user, repos } = await getGitHubData();

  // Handle error state
  if (!user) {
    return (
      <Flex fillWidth direction="column" gap="32" padding="32">
        <Text variant="heading-strong-l" onBackground="danger-strong">
          Failed to load GitHub profile
        </Text>
      </Flex>
    );
  }

  return (
    <Flex fillWidth direction="column" gap="32">
      <UserProfile user={user} person={person} />
      <GitHubStats user={user} />
      <GitHubAchievements username={GITHUB_USERNAME} />
      <GitHubCalendar username={GITHUB_USERNAME} />
      <RepoList repos={repos} />
    </Flex>
  );
}
