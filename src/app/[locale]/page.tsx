import React from "react";
import dynamic from "next/dynamic";
import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
} from "@/once-ui/components";
import { baseURL, routes, renderContent } from "@/app/resources";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

// Dynamically import heavy components with proper types
const Projects = dynamic(
  () => import("@/components/work/Projects").then((mod) => mod.Projects),
  {
    ssr: true,
  },
) as typeof Projects;

const Posts = dynamic(
  () => import("@/components/blog/Posts").then((mod) => mod.Posts),
  {
    ssr: true,
  },
) as typeof Posts;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();
  const { home } = renderContent(t);
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${locale}`,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  const { home, about, person } = renderContent(t);

  return (
    <Flex maxWidth="m" fillWidth gap="l" direction="column" alignItems="center">
      {/* Header Section */}
      <RevealFx speed="fast">
        <Flex fillWidth direction="column" gap="m" maxWidth="s">
          <Heading wrap="balance" variant="display-strong-l">
            {home.headline}
          </Heading>
          <Text
            wrap="balance"
            onBackground="neutral-weak"
            variant="heading-default-m"
          >
            {home.subline}
          </Text>

          {/* Quick Links */}
          <Flex gap="8" fillWidth>
            <Button href={`/${locale}/about`} variant="tertiary" size="s">
              <Flex gap="8" alignItems="center">
                {about.avatar.display && (
                  <Avatar src={person.avatar} size="s" />
                )}
                About
              </Flex>
            </Button>
            <Button
              href={`/${locale}/github`}
              variant="tertiary"
              size="s"
              prefixIcon="github"
            >
              GitHub
            </Button>
          </Flex>
        </Flex>
      </RevealFx>

      {/* Featured Projects */}
      <RevealFx speed="fast">
        <Flex fillWidth direction="column" gap="m">
          <Heading variant="heading-strong-m">Featured Project</Heading>
          <Projects locale={locale} showFeatured={true} />
        </Flex>
      </RevealFx>

      {/* Content Grid */}
      <RevealFx speed="fast">
        <Flex fillWidth gap="20" wrap>
          {routes["/blog"] && (
            <Flex
              flex={1}
              direction="column"
              gap="m"
              style={{ minWidth: "300px" }}
            >
              <Heading variant="heading-strong-s">Latest Posts</Heading>
              <Posts locale={locale} range={[1, 2]} columns="1" />
            </Flex>
          )}
          <Flex
            flex={1}
            direction="column"
            gap="m"
            style={{ minWidth: "300px" }}
          >
            <Heading variant="heading-strong-s">Recent Projects</Heading>
            <Projects locale={locale} showRecent={true} />
          </Flex>
        </Flex>
      </RevealFx>
    </Flex>
  );
}
