"use client";

import { useState } from "react";
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  Background,
} from "@/once-ui/components";

type NewsletterProps = {
  newsletter: {
    display: boolean;
    title: string | JSX.Element;
    description: string | JSX.Element;
  };
};

export const Newsletter = ({ newsletter }: NewsletterProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to subscribe");
    }
  };

  return (
    <Flex
      style={{ overflow: "hidden" }}
      position="relative"
      fillWidth
      padding="xl"
      radius="l"
      marginBottom="m"
      direction="column"
      alignItems="center"
      align="center"
      background="surface"
      border="neutral-medium"
      borderStyle="solid-1"
    >
      <Background
        position="absolute"
        mask="topRight"
        gradient={{
          display: true,
          opacity: 0.6,
        }}
      />
      <Heading
        style={{ position: "relative" }}
        marginBottom="s"
        variant="display-strong-xs"
      >
        {newsletter.title}
      </Heading>
      <Text
        style={{
          position: "relative",
          maxWidth: "var(--responsive-width-xs)",
        }}
        wrap="balance"
        marginBottom="l"
        onBackground="neutral-medium"
      >
        {newsletter.description}
      </Text>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Flex fillWidth maxWidth={24} gap="8">
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
            required
            disabled={status === "loading" || status === "success"}
          />
          <Button
            type="submit"
            loading={status === "loading"}
            disabled={status === "success"}
            fillWidth
          >
            {status === "success" ? "Subscribed!" : "Subscribe"}
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
