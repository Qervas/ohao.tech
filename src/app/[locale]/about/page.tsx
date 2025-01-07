import {
  Avatar,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  SmartImage,
  Tag,
  Text,
} from "@/once-ui/components";
import { baseURL, renderContent } from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import ProjectTimeline from "./ProjectTimeline";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations();
  const { person, about, social } = renderContent(t);
  const title = about.title;
  const description = about.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/${locale}/about`,
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

export default function About({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  const { person, about, social } = renderContent(t);
  const calendarLinks = {
    google: "https://calendar.app.google/XWZjnQ3NTcGHzP6U6",
  };
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },

    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
    {
      title: about.projects.title,
      display: about.projects.display,
      items: about.projects.items.map((project) => project.title),
    },
  ];
  return (
    <Flex fillWidth maxWidth="xl" direction="column">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            description: about.intro.description,
            url: `https://${baseURL}/about`,
            image: `${baseURL}/images/${person.avatar}`,
            sameAs: social
              .filter((item) => item.link && !item.link.startsWith("mailto:"))
              .map((item) => item.link),
            worksFor: {
              "@type": "Organization",
              name: about.work.experiences[0].company || "",
            },
          }),
        }}
      />

      {/* Main Content Container */}
      <Flex fillWidth direction="column" gap="xl">
        {/* Header Card */}
        <Flex
          fillWidth
          direction="row"
          gap="xl"
          alignItems="center"
          padding="xl"
          style={{
            borderBottom: "1px solid var(--brand-alpha-weak)",
            background: "var(--surface-raised)",
            borderRadius: "var(--radius-xl)",
          }}
        >
          {/* Avatar and Location */}
          {about.avatar.display && (
            <Flex gap="l">
              <Avatar src={person.avatar} size="xl" />
              <Flex direction="column" gap="m">
                <Flex gap="8" alignItems="center">
                  <Icon onBackground="accent-weak" name="globe" />
                  {person.location}
                </Flex>
                {person.languages.length > 0 && (
                  <Flex wrap gap="8">
                    {person.languages.map((language, index) => (
                      <Tag key={index} size="s">
                        {language}
                      </Tag>
                    ))}
                  </Flex>
                )}
              </Flex>
            </Flex>
          )}

          {/* Name and Info */}
          <Flex direction="column" gap="m" flex={1}>
            {about.calendar.display && (
              <Flex
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                  border: "1px solid var(--brand-alpha-medium)",
                  width: "fit-content",
                }}
                alpha="brand-weak"
                radius="full"
                padding="4"
                gap="8"
                alignItems="center"
              >
                <Flex paddingLeft="12">
                  <Icon name="calendar" onBackground="brand-weak" />
                </Flex>
                <Flex paddingX="8">Schedule a call</Flex>
                <IconButton
                  href={calendarLinks.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-border="rounded"
                  variant="tertiary"
                  icon="chevronRight"
                />
              </Flex>
            )}

            <Heading variant="display-strong-xl">{person.name}</Heading>
            <Text variant="display-default-xs" onBackground="neutral-weak">
              {person.role}
            </Text>

            {social.length > 0 && (
              <Flex gap="8" wrap>
                {social.map(
                  (item) =>
                    item.link && (
                      <Button
                        key={item.name}
                        href={item.link}
                        prefixIcon={item.icon}
                        label={item.name}
                        size="s"
                        variant="tertiary"
                      />
                    ),
                )}
              </Flex>
            )}
          </Flex>
        </Flex>

        {/* Content Sections */}
        <Flex fillWidth direction="column" gap="xl" padding="xl">
          {/* Introduction */}
          {about.intro.display && (
            <Flex
              direction="column"
              textVariant="body-default-l"
              fillWidth
              gap="m"
            >
              {about.intro.description}
            </Flex>
          )}

          {/* Work Experience */}
          {about.work.display && (
            <section>
              <Heading as="h2" variant="display-strong-s" marginBottom="l">
                {about.work.title}
              </Heading>
              <Flex direction="column" fillWidth gap="l">
                {about.work.experiences.map((experience, index) => (
                  <Flex
                    key={`${experience.company}-${experience.role}-${index}`}
                    fillWidth
                    direction="column"
                    gap="m"
                  >
                    <Flex
                      fillWidth
                      justifyContent="space-between"
                      alignItems="flex-end"
                    >
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text
                        variant="heading-default-xs"
                        onBackground="neutral-weak"
                      >
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text variant="body-default-s" onBackground="brand-weak">
                      {experience.role}
                    </Text>
                    <Flex as="ul" direction="column" gap="16">
                      {experience.achievements.map(
                        (achievement: string, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${index}`}
                          >
                            {achievement}
                          </Text>
                        ),
                      )}
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </section>
          )}

          {/* Studies */}
          {about.studies.display && (
            <section>
              <Heading as="h2" variant="display-strong-s" marginBottom="l">
                {about.studies.title}
              </Heading>
              <Flex direction="column" fillWidth gap="l">
                {about.studies.institutions.map((institution, index) => (
                  <Flex
                    key={`${institution.name}-${index}`}
                    fillWidth
                    gap="4"
                    direction="column"
                  >
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text
                      variant="heading-default-xs"
                      onBackground="neutral-weak"
                    >
                      {institution.description}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </section>
          )}

          {/* Technical Skills */}
          {about.technical.display && (
            <section>
              <Heading as="h2" variant="display-strong-s" marginBottom="l">
                {about.technical.title}
              </Heading>
              <Flex direction="column" fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Flex
                    key={`${skill}-${index}`}
                    fillWidth
                    gap="4"
                    direction="column"
                  >
                    <Text variant="heading-strong-l">{skill.title}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </section>
          )}

          {/* Projects Timeline */}
          {about.projects.display && (
            <section>
              <Heading as="h2" variant="display-strong-s" marginBottom="l">
                {about.projects.title}
              </Heading>
              <ProjectTimeline projects={about.projects.items} />
            </section>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
