"use client";

import { Flex, Text, SmartImage, Badge, Button } from "@/once-ui/components";
import { IconButton } from "@/once-ui/components";

interface UserProfileProps {
  user: {
    avatar_url: string;
    name: string;
    login: string;
    bio: string;
    followers: number;
    following: number;
    company?: string;
    location?: string;
    blog?: string;
    twitter_username?: string;
  };
  person: {
    firstName: string;
    lastName: string;
    role: string;
  };
}

export default function UserProfile({ user, person }: UserProfileProps) {
  return (
    <Flex
      fillWidth
      gap="24"
      padding="32"
      background="surface"
      radius="l"
      direction="column"
    >
      <Flex gap="24" alignItems="flex-start">
        {/* Profile Image */}
        <Flex style={{ width: 200, height: 200, position: "relative" }}>
          <SmartImage
            src={user.avatar_url}
            alt={user.name}
            fill
            sizes="200px"
            style={{ objectFit: "cover" }}
            radius="m"
          />
        </Flex>

        {/* Profile Info */}
        <Flex direction="column" gap="16" flex={1}>
          <Flex direction="column" gap="4">
            <Text variant="heading-strong-xl" onBackground="neutral-strong">
              {user.name}
            </Text>
            <Text variant="heading-default-m" onBackground="neutral-medium">
              {user.login}
            </Text>
          </Flex>

          <Text variant="body-default-m" onBackground="neutral-medium">
            {user.bio}
          </Text>

          <Flex gap="16">
            <Button variant="primary" label="Follow" prefixIcon="userPlus" />
            <Button variant="secondary" label="Sponsor" prefixIcon="heart" />
          </Flex>

          <Flex gap="24">
            <Flex gap="8" alignItems="center">
              <IconButton icon="users" variant="ghost" />
              <Text variant="body-default-s" onBackground="neutral-medium">
                <strong>{user.followers}</strong> followers
              </Text>
            </Flex>
            <Flex gap="8" alignItems="center">
              <IconButton icon="userGroup" variant="ghost" />
              <Text variant="body-default-s" onBackground="neutral-medium">
                <strong>{user.following}</strong> following
              </Text>
            </Flex>
          </Flex>

          <Flex gap="24" direction="column">
            {user.company && (
              <Flex gap="8" alignItems="center">
                <IconButton icon="building" variant="ghost" />
                <Text variant="body-default-s" onBackground="neutral-medium">
                  {user.company}
                </Text>
              </Flex>
            )}
            {user.location && (
              <Flex gap="8" alignItems="center">
                <IconButton icon="mapPin" variant="ghost" />
                <Text variant="body-default-s" onBackground="neutral-medium">
                  {user.location}
                </Text>
              </Flex>
            )}
            {user.blog && (
              <Flex gap="8" alignItems="center">
                <IconButton icon="link" variant="ghost" />
                <Text
                  as="a"
                  href={user.blog}
                  target="_blank"
                  variant="body-default-s"
                  onBackground="neutral-medium"
                >
                  {user.blog}
                </Text>
              </Flex>
            )}
            {user.twitter_username && (
              <Flex gap="8" alignItems="center">
                <IconButton icon="twitter" variant="ghost" />
                <Text
                  as="a"
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  variant="body-default-s"
                  onBackground="neutral-medium"
                >
                  @{user.twitter_username}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
