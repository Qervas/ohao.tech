import { getPosts } from "@/app/utils/utils";
import {
  Flex,
  Heading,
  Text,
  Grid,
  Tag,
  SmartImage,
  SmartLink,
} from "@/once-ui/components";
import styles from "./Projects.module.scss";

// Define status types and their properties
const STATUS_CONFIG = {
  active: {
    label: "Active",
    variant: "success" as const,
  },
  completed: {
    label: "Completed",
    variant: "info" as const,
  },
  onHold: {
    label: "On Hold",
    variant: "warning" as const,
  },
  discontinued: {
    label: "Discontinued",
    variant: "danger" as const,
  },
};

interface ProjectsProps {
  locale: string;
  showFeatured?: boolean;
  showRecent?: boolean;
}

export function Projects({ locale, showFeatured, showRecent }: ProjectsProps) {
  const projects = getPosts([
    "src",
    "app",
    "[locale]",
    "work",
    "projects",
    locale,
  ]);

  const sortedProjects = projects.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  );

  let filteredProjects = sortedProjects;

  // If either filter is active, apply filtering
  if (showFeatured || showRecent) {
    filteredProjects = sortedProjects.filter((project) => {
      // For featured section
      if (showFeatured && project.metadata.featured) {
        return true;
      }

      // For recent section
      if (showRecent) {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const publishDate = new Date(project.metadata.publishedAt);
        return publishDate >= sixMonthsAgo;
      }

      return false;
    });
  }

  if (filteredProjects.length === 0) {
    return (
      <Flex
        padding="l"
        background="surface"
        radius="l"
        border="neutral-medium"
        borderStyle="solid-1"
        direction="column"
        alignItems="center"
        gap="m"
      >
        <Text variant="body-default-m" onBackground="neutral-weak">
          {showFeatured
            ? "No featured projects available."
            : showRecent
              ? "No projects in the last 6 months."
              : "No projects available."}
        </Text>
      </Flex>
    );
  }

  return (
    <Grid columns="repeat(auto-fill, minmax(320px, 1fr))" gap="m" fillWidth>
      {filteredProjects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </Grid>
  );
}

function ProjectCard({ project }: { project: any }) {
  const status = project.metadata.status || "completed";
  const statusConfig = STATUS_CONFIG[status as keyof typeof STATUS_CONFIG];

  return (
    <SmartLink href={`/work/${project.slug}`} unstyled>
      <Flex
        direction="column"
        background="surface"
        radius="l"
        border="neutral-medium"
        borderStyle="solid-1"
        fillHeight
        className={styles.projectCard}
      >
        {/* Thumbnail */}
        <div className={styles.imageContainer}>
          <SmartImage
            src={project.metadata.images?.[0] || "/images/placeholder.png"}
            alt={project.metadata.title}
            aspectRatio="16/9"
            className={styles.image}
          />
          <Flex gap="8" className={styles.tags}>
            {statusConfig && (
              <Tag
                variant={statusConfig.variant}
                size="s"
                label={statusConfig.label}
              />
            )}
            {project.metadata.tag && (
              <Tag variant="brand" size="s" label={project.metadata.tag} />
            )}
          </Flex>
        </div>

        {/* Content */}
        <Flex direction="column" padding="m" gap="s" flex={1}>
          <Heading variant="heading-strong-s" className={styles.title}>
            {project.metadata.title}
          </Heading>

          <Text
            variant="body-default-s"
            onBackground="neutral-weak"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.metadata.summary}
          </Text>

          <Flex marginY="s" gap="s">
            {project.metadata.technologies
              ?.slice(0, 3)
              .map((tech: string) => (
                <Tag key={tech} variant="neutral" size="s" label={tech} />
              ))}
            {(project.metadata.technologies?.length || 0) > 3 && (
              <Tag
                variant="neutral"
                size="s"
                label={`+${project.metadata.technologies.length - 3}`}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </SmartLink>
  );
}
