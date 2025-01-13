import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Shaoxuan",
  lastName: "Yin",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Computer Science Graduate Student",
  avatar: "/images/avatar.png",
  location: "Europe/Stockholm",
  languages: ["Chinese (Native)", "English (Fluent)"],
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
  headline: <>Graphics Engineer and AI Builder</>,
  subline: (
    <>
      I'm Shaoxuan, a computer science student at{" "}
      <InlineCode>Linköping University</InlineCode>, where I explore computer
      graphics and <br />
      AI technologies. I build games and tools in my free time.
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
  lab: {
    display: true,
    title: "Laboratory Experience",
    experiences: [
      {
        company: "Computer Vision and AI Laboratory, BISTU",
        timeframe: "March 2021 - December 2021",
        role: "Research Assistant",
        achievements: [
          <>
            Led development of real-time skiing movement classification system
            achieving 80% accuracy using STGCN
          </>,
          <>
            Integrated OpenPose framework for robust skeleton coordinate
            extraction from video data
          </>,
          <>
            Published research findings in Chinese academic journal "Intelligent
            Computer and Applications"
          </>,
        ],
        images: [],
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
            src: "/projects/image/project-01/raytracer.png",
            alt: "Monte-Carlo Ray Tracer",
            width: 16,
            height: 9,
          },
          {
            src: "/projects/image/water.png",
            alt: "Water Simulation",
            width: 16,
            height: 9,
          },
        ],
      },
    ],
  },
  projects: {
    display: true,
    title: "Featured Projects",
    items: [
      {
        title: "Ohao Engine",
        timeframe: "Nov 2023 - Present",
        description:
          "A modern physics engine featuring Vulkan-based rendering pipeline, focusing on high-performance simulation and realistic graphics rendering",
        achievements: [
          "Developing a custom physics engine with rigid body dynamics, continuous collision detection, and constraint solvers",
          "Implementing physically-based rendering (PBR) pipeline with real-time global illumination",
          "Creating procedural generation systems for terrains, materials, and dynamic environments",
          "Optimizing performance through parallel computation and efficient memory management",
        ],
        technologies: ["C++20", "Vulkan", "GLSL", "CMake", "Physics"],
        link: "",
      },
      {
        title: "Retro Vault",
        timeframe: "Sep - Oct 2023",
        description:
          "An innovative 2D puzzle platformer featuring a unique time-clone mechanic, developed in Unity for the LiU Game Jam",
        achievements: [
          "Designed and implemented core gameplay mechanics including character controller and time-clone system",
          "Created puzzle mechanics requiring cooperation between the player and their time clone",
          "Developed a robust level progression system with increasing complexity",
          "Implemented pixel-perfect collision detection and smooth character animations",
        ],
        technologies: ["Unity", "C#", "2D Physics", "Game Design"],
        link: "",
      },
      {
        title: "Path Tracer",
        timeframe: "Sep 2023",
        description:
          "A CUDA-accelerated Monte Carlo path tracer implementing physically accurate light transport simulation",
        achievements: [
          "Implemented unbiased path tracing with importance sampling and multiple importance sampling",
          "Developed realistic material system supporting diffuse, specular, and transmissive surfaces",
          "Achieved interactive frame rates through CUDA optimization and efficient GPU utilization",
          "Added support for environment mapping and HDR rendering",
        ],
        technologies: ["C++", "CUDA", "OptiX", "Computer Graphics"],
        link: "",
      },
      {
        title: "Water Simulation",
        timeframe: "May - Jun 2023",
        description:
          "Real-time fluid simulation using Smoothed Particle Hydrodynamics (SPH) with OpenGL visualization",
        achievements: [
          "Implemented SPH algorithm with neighbor search optimization using spatial hashing",
          "Created real-time rendering system with dynamic lighting and environment mapping",
          "Developed interactive camera system with depth-of-field and motion blur effects",
          "Optimized particle system to handle over 100,000 particles at interactive framerates",
        ],
        technologies: ["OpenGL", "C++", "CUDA", "Fluid Dynamics"],
        link: "",
      },
      {
        title: "Xiangqi AI",
        timeframe: "Mar - Apr 2023",
        description:
          "A deep reinforcement learning system for Chinese Chess (Xiangqi) with custom neural network implementation",
        achievements: [
          "Built neural network framework from scratch with CUDA acceleration",
          "Implemented Deep Q-Learning with experience replay and target network",
          "Created Qt-based GUI supporting both human-AI and AI-AI gameplay modes",
          "Achieved competitive playing strength through self-play training",
        ],
        technologies: ["C++", "CUDA", "Qt", "Deep Learning"],
        link: "",
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about tech and fun...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Projects",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const github = {
  label: "Github",
  title: "My github gallery",
  description: `A code collection by ${person.name}`,
};

export { person, social,  home, about, blog, work, github };
