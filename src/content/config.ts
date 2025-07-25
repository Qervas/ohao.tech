import { defineCollection, z } from "astro:content";

const sessions = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    type: z
      .enum(["book", "music", "course", "project", "series"])
      .default("book"),
    status: z.enum(["active", "completed", "paused"]).default("active"),
    startedAt: z.coerce.date(),
    completedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),

    // For book sessions
    book: z
      .object({
        title: z.string(),
        author: z.string(),
        isbn: z.string().optional(),
        cover: z.string().optional(),
        totalPages: z.number().optional(),
        currentPage: z.number().optional(),
        totalChapters: z.number().optional(),
        currentChapter: z.number().optional(),
        rating: z.number().min(1).max(5).optional(),
      })
      .optional(),

    // For music sessions
    music: z
      .object({
        artist: z.string(),
        albumTitle: z.string().optional(),
        cover: z.string().optional(),
        releaseYear: z.number().optional(),
        genre: z.array(z.string()).default([]),
        totalTracks: z.number().optional(),
        rating: z.number().min(1).max(5).optional(),
      })
      .optional(),

    // For course sessions
    course: z
      .object({
        instructor: z.string(),
        platform: z.string().optional(),
        duration: z.string().optional(),
        totalLessons: z.number().optional(),
        currentLesson: z.number().optional(),
        certificate: z.boolean().default(false),
        rating: z.number().min(1).max(5).optional(),
      })
      .optional(),

    coverImage: z
      .object({
        src: z.string(),
        alt: z.string().optional(),
      })
      .optional(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    status: z
      .enum(["active", "completed", "paused", "planning"])
      .default("active"),
    category: z.enum(["graphics", "ai", "engine", "research", "web", "tools"]),
    technologies: z.array(z.string()),
    repository: z.string().url().optional(),
    demo: z.string().url().optional(),
    paper: z.string().url().optional(),
    images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().optional(),
          caption: z.string().optional(),
          type: z.enum(["image", "diagram"]).default("image"),
        }),
      )
      .default([]),
    coverImage: z
      .object({
        src: z.string(),
        alt: z.string().optional(),
      })
      .optional(),
    team: z
      .array(
        z.object({
          name: z.string(),
          role: z.string(),
          avatar: z.string().optional(),
          linkedin: z.string().url().optional(),
          github: z.string().url().optional(),
        }),
      )
      .optional(),
    highlights: z.array(z.string()).optional(),
    timeline: z
      .object({
        start: z.coerce.date(),
        end: z.coerce.date().optional(),
        duration: z.string().optional(),
      })
      .optional(),
    metrics: z
      .object({
        performance: z.string().optional(),
        accuracy: z.string().optional(),
        users: z.string().optional(),
        citations: z.number().optional(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    pdfs: z
      .array(
        z.object({
          src: z.string(),
          title: z.string(),
          description: z.string().optional(),
          type: z
            .enum(["report", "slides", "paper", "documentation"])
            .default("report"),
        }),
      )
      .default([]),
    diagrams: z
      .array(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          type: z
            .enum(["architecture", "flowchart", "sequence", "class"])
            .default("architecture"),
          diagram: z.string(),
          height: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    type: z
      .enum(["article", "thought", "quote", "reading", "life", "series"])
      .default("article"),
    status: z.enum(["published", "draft"]).default("published"),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    readingTime: z.number().optional(),

    // For series content
    series: z
      .object({
        name: z.string(),
        part: z.number(),
        total: z.number().optional(),
      })
      .optional(),

    // Session reference
    session: z
      .object({
        slug: z.string(), // Reference to session slug
        part: z.number().optional(), // Which part of the session this is
        title: z.string().optional(), // Optional custom title for this part
      })
      .optional(),

    // For reading content
    book: z
      .object({
        title: z.string(),
        author: z.string(),
        isbn: z.string().optional(),
        cover: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
        status: z
          .enum(["reading", "finished", "want-to-read"])
          .default("reading"),
      })
      .optional(),

    // For quote content
    quote: z
      .object({
        text: z.string(),
        author: z.string(),
        source: z.string().optional(),
      })
      .optional(),

    // Visual content
    coverImage: z
      .object({
        src: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional(),
      })
      .optional(),

    images: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string().optional(),
          caption: z.string().optional(),
        }),
      )
      .default([]),

    // External links
    links: z
      .array(
        z.object({
          title: z.string(),
          url: z.string().url(),
          description: z.string().optional(),
        }),
      )
      .default([]),

    // Mood/tone for personal content
    mood: z.string().optional(),
    location: z.string().optional(),
  }),
});

export const collections = {
  projects,
  articles,
  sessions,
};
