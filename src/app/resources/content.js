import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Shaoxuan",
  lastName: "Yin",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Computer Science Graduate Student",
  avatar: "/images/avatar.jpg",
  location: "Europe/Stockholm",
  languages: ["Chinese (Native)", "English (Fluent)"],
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Qervas",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/shaoxuan-yin-021548170/",
  },
  {
    name: "YouTube",
    icon: "youtube",
    link: "https://www.youtube.com/channel/UCpQsuzZtivtAUV1Xvcpt02w",
  },
  {
    name: "Twitter",
    icon: "x",
    link: "https://twitter.com/FrankYin17",
  },
  {
    name: "Email",
    icon: "email",
    link: "djmax96945147@outlook.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Design engineer and builder</>,
  subline: (
    <>
      I'm Selene, a design engineer at <InlineCode>FLY</InlineCode>, where I
      craft intuitive
      <br /> user experiences. After hours, I build my own projects.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Passionate computer science student with a focus on graphics and AI.
        Exploring the intersection of technology and creativity to build
        innovative solutions.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Beijing Guoyao Xintiandi Information Technology",
        timeframe: "August 2022 - September 2022",
        role: "C++ Development Engineer Intern",
        achievements: [
          <>
            Implemented user interfaces and part of an interactive 3D terrain
            rendering system using Qt framework and OpenGL
          </>,
          <>
            Participated in custom network protocol development based on socket
            communication, reducing data transfer overhead and enhancing
            real-time capabilities
          </>,
        ],
        images: [],
      },
      {
        company: "GienTech Technology",
        timeframe: "July 2021 - August 2021",
        role: "Software Engineer Intern",
        achievements: [
          <>
            Developed a WeChat Mini Program for an online farmer's market,
            handling thousands of active daily users
          </>,
          <>
            Implemented microservices using Spring Cloud and optimized database
            queries for improved performance
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Linköping University",
        description: (
          <>Master of Science in Computer Science (Sep 2023 - Present)</>
        ),
      },
      {
        name: "Beijing Information Science & Technology University",
        description: (
          <>
            Bachelor of Engineering in Computer Science and Technology (Sep 2019
            - June 2023)
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Programming Languages",
        description: (
          <>
            Proficient in C++, Python, C, Java, JavaScript, and Shell scripting
          </>
        ),
        images: [],
      },
      {
        title: "Frameworks & Tools",
        description: (
          <>
            Experience with OpenGL, Qt, CUDA, Three.js, Unreal Engine, Unity,
            CMake, Docker, and Nginx
          </>
        ),
        images: [],
      },
      {
        title: "Featured Projects",
        description: (
          <>
            Monte-Carlo Ray Tracer, Water Simulation, Retro Vault game,
            AI-powered Skiing Analysis, and more
          </>
        ),
        images: [
          {
            src: "/projects/image/1_project/raytracer.png",
            alt: "Monte-Carlo Ray Tracer",
            width: 16,
            height: 9,
          },
          {
            src: "/projects/image/3_project/water.png",
            alt: "Water Simulation",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
