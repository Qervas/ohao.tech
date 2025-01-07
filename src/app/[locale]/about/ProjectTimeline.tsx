"use client";

import { useMemo, memo } from "react";
import { Flex, Text, Tag, Button } from "@/once-ui/components";
import styles from "./ProjectTimeline.module.scss";

type Project = {
  title: string;
  timeframe: string;
  description: string;
  achievements: string[];
  technologies: string[];
  link?: string;
};

const ProjectCard = memo(({ project }: { project: Project }) => (
  <div className={styles.bubbleCard}>
    <div className={styles.bubbleContent}>
      <Text variant="display-strong-l" className={styles.title}>
        {project.title}
      </Text>
      <Text variant="body-default-m" className={styles.description}>
        {project.description}
      </Text>

      <div className={styles.technologiesSection}>
        <Text variant="label-strong-m" className={styles.sectionTitle}>
          Technologies
        </Text>
        <Flex wrap gap="8" className={styles.tags}>
          {project.technologies.map((tech) => (
            <Tag key={tech} size="s">{tech}</Tag>
          ))}
        </Flex>
      </div>

      <div className={styles.achievementsSection}>
        <Text variant="label-strong-m" className={styles.sectionTitle}>
          Key Achievements
        </Text>
        <ul className={styles.achievements}>
          {project.achievements.map((achievement, idx) => (
            <li key={idx}>{achievement}</li>
          ))}
        </ul>
      </div>

      {project.link && (
        <Button
          href={project.link}
          label="View Project"
          variant="secondary"
          size="m"
          className={styles.viewButton}
          prefixIcon="arrowRight"
        />
      )}
    </div>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

export default function ProjectTimeline({ projects }: { projects: Project[] }) {
  const sortedProjects = useMemo(() => (
    [...projects].sort((a, b) => {
      const yearA = parseInt(a.timeframe.match(/\d{4}/)?.[0] ?? "9999");
      const yearB = parseInt(b.timeframe.match(/\d{4}/)?.[0] ?? "9999");
      return yearB - yearA;
    })
  ), [projects]);

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timeline}>
        {sortedProjects.map((project) => (
          <div key={project.title} className={styles.timelineNode}>
            <div className={styles.timeMarker}>
              <span>{project.timeframe}</span>
            </div>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
