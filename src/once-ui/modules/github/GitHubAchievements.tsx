"use client";

import { Flex, Text } from "@/once-ui/components";
import Image from "next/image";

interface GitHubAchievementsProps {
  username: string;
}

export default function GitHubAchievements({
  username,
}: GitHubAchievementsProps) {
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
        GitHub Achievements
      </Text>

      {/* GitHub Trophy */}
      <Flex direction="column" gap="16">
        <Text variant="heading-strong-m" onBackground="neutral-strong">
          Trophies
        </Text>
        <Image
          src={`https://github-profile-trophy.vercel.app/?username=${username}&theme=darkhub&no-frame=true&no-bg=true&margin-w=4&margin-h=4`}
          alt="GitHub Trophies"
          width={800}
          height={200}
          style={{ width: "100%", height: "auto" }}
        />
      </Flex>

      {/* GitHub Stats */}
      <Flex direction="column" gap="16">
        <Text variant="heading-strong-m" onBackground="neutral-strong">
          Statistics
        </Text>
        <Flex gap="16" wrap>
          <Image
            src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark&hide_border=true&count_private=true&bg_color=00000000&text_color=ffffff`}
            alt="GitHub Stats"
            width={400}
            height={200}
            style={{ width: "48%", height: "auto", minWidth: "300px" }}
          />
          <Image
            src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true&mode=weekly&background=00000000&border=00000000`}
            alt="GitHub Streak"
            width={400}
            height={200}
            style={{ width: "48%", height: "auto", minWidth: "300px" }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
