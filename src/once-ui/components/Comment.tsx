"use client";

import React from "react";
import { Flex, Text, Icon } from "@/once-ui/components";

interface CommentProps {
  author?: string;
  handle?: string;
  content: React.ReactNode;
  icon?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Comment: React.FC<CommentProps> = ({
  author = "Note",
  handle,
  content,
  icon = "info",
  className,
  style,
}) => {
  return (
    <Flex
      direction="column"
      gap="16"
      background="surface"
      padding="24"
      radius="l"
      border="neutral-weak"
      borderStyle="solid-1"
      marginTop="32"
      className={className}
      style={style}
    >
      <Flex gap="12" alignItems="center">
        <Icon name={icon} size="m" onBackground="neutral-medium" />
        <Flex direction="column" gap="4">
          <Text variant="heading-default-s" onBackground="neutral-medium">
            {author}
          </Text>
          {handle && (
            <Text variant="body-default-xs" onBackground="neutral-weak">
              @{handle}
            </Text>
          )}
        </Flex>
      </Flex>

      <Flex
        gap="16"
        padding="16"
        background="neutral-weak"
        radius="m"
        style={{
          borderLeft: "4px solid var(--neutral-border-medium)",
        }}
      >
        <Text variant="body-default-s" onBackground="neutral-medium">
          {content}
        </Text>
      </Flex>
    </Flex>
  );
};
