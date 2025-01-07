import React from "react";

import {
  Heading,
  Flex,
  Text,
  Button,
  Avatar,
  RevealFx,
  Arrow,
} from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";

import { baseURL, routes, renderContent } from "@/app/resources";
import { Newsletter } from "@/components/Newsletter";
import { Posts } from "@/components/blog/Posts";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";

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
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
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
  const { home, about, person, newsletter } = renderContent(t);
  return (
    <Flex
      maxWidth="m"
      fillWidth
      gap="l" // Reduced from xl
      direction="column"
      alignItems="center"
    >
      {/* Schema and metadata script remains the same */}

      {/* Header Section - More compact */}
      <Flex fillWidth direction="column" paddingY="m" gap="m">
        <Flex direction="column" fillWidth maxWidth="s">
          <RevealFx
            translateY="4"
            fillWidth
            justifyContent="flex-start"
            paddingBottom="s" // Reduced padding
          >
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>
          <RevealFx
            translateY="8"
            delay={0.2}
            fillWidth
            justifyContent="flex-start"
            paddingBottom="s" // Reduced padding
          >
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="heading-default-m" // Smaller text
            >
              {home.subline}
            </Text>
          </RevealFx>

          {/* Quick Links Section */}
          <RevealFx translateY="12" delay={0.4}>
            <Flex gap="8" fillWidth>
              <Button
                id="about"
                href={`/${locale}/about`}
                variant="tertiary"
                size="s" // Smaller button
              >
                <Flex gap="8" alignItems="center">
                  {about.avatar.display && (
                    <Avatar
                      src={person.avatar}
                      size="s" // Smaller avatar
                    />
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
          </RevealFx>
        </Flex>
      </Flex>

      {/* Featured Project - More focused */}
      <RevealFx translateY="16" delay={0.6}>
        <Flex fillWidth direction="column" gap="m">
          <Heading variant="heading-strong-m">Featured Project</Heading>
          <Projects locale={locale} showFeatured={true} />
        </Flex>
      </RevealFx>

      {/* Blog & Projects Side by Side */}
      <Flex fillWidth gap="20" wrap>
        {routes["/blog"] && (
          <Flex
            flex={1}
            direction="column"
            gap="m"
            style={{ minWidth: "300px" }} // Move to style prop instead
          >
            <Heading variant="heading-strong-s">Latest Posts</Heading>
            <Posts range={[1, 2]} columns="1" locale={locale} />
          </Flex>
        )}
        <Flex flex={1} direction="column" gap="m" style={{ minWidth: "300px" }}>
          <Heading variant="heading-strong-s">Recent Projects</Heading>
          <Projects locale={locale} showRecent={true} />
        </Flex>
      </Flex>

      {/* Newsletter - Keep if needed */}
      {newsletter.display && (
        <Flex fillWidth maxWidth="s">
          <Newsletter newsletter={newsletter} />
        </Flex>
      )}
    </Flex>
  );
}
