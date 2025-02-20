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
    link: "mailto:shayi783@student.liu.se",
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
      AI cutting-edge tech. I build programming games and tools in my free time
      for fun.
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
        title: "Neural Scene Representation and Rendering",
        timeframe: "Feb 2025 - Present",
        description:
          "Master thesis research exploring neural rendering techniques, focusing on NeRF and 3D Gaussian Splatting",
        technologies: [
          "NeRF",
          "3D Gaussian Splatting",
          "Neural Networks",
          "PyTorch",
        ],
        achievements: [
          "Currently in data collection and research methodology planning phase",
          "Setting up evaluation metrics and benchmarking frameworks",
          "Investigating existing implementations of NeRF and Gaussian Splatting",
          "Designing comparative analysis methodology",
        ],
        link: "/work/neural_rendering",
      },
      {
        title: "LexiBytes",
        timeframe: "Feb 2025 - Present",
        description:
          "Revolutionary game leveraging local LLM technology for infinite, personalized player interactions",
        technologies: ["C++", "Unity", "Local LLMs", "Ollama", "Steam SDK"],
        achievements: [
          "Implementing multi-stage AI integration: text generation (Phase 1), static image generation (Phase 2), and dynamic visual content (Phase 3)",
          "Architecting sophisticated agent system using Ollama for local LLM inference with multiple AI-driven NPCs",
          "Building cross-platform C++ backend for seamless integration with Unity frontend",
          "Designing modular prompt engineering system for dynamic storytelling",
        ],
        link: "/work/lexibytes",
      },
      {
        title: "Material Aging and Weathering Engine",
        timeframe: "Dec 2024 - Jan 2025",
        description:
          "Advanced real-time material simulation system using compute shaders",
        technologies: ["OpenGL", "Compute Shaders", "GLSL", "C++"],
        achievements: [
          "Engineered real-time material simulation system using compute shaders",
          "Implemented multi-scale noise algorithms for realistic rust formation",
          "Developed dynamic weather system affecting material properties",
          "Integrated physics system for object interactions using Verlet integration",
        ],
        link: "/work/aging_shader",
      },
      {
        title: "Ohao Engine",
        timeframe: "Nov 2024 - Present",
        description:
          "A physics engine with Vulkan-based rendering pipeline built from scratch",
        technologies: ["C++", "Vulkan", "Physics Engine", "GLSL"],
        achievements: [
          "Developing physics engine with rigid body dynamics and collision detection",
          "Implementing physically-based rendering (PBR) with real-time shading",
          "Integrating constraint solvers and material systems",
          "Designing procedural content generation for terrain and textures",
        ],
        link: "/work/ohao_engine",
      },
      {
        title: "Path Tracer",
        timeframe: "Sep - Oct 2024",
        description:
          "CUDA-accelerated path tracer for advanced global illumination",
        technologies: ["C++", "CUDA", "Ray Tracing", "PBR"],
        achievements: [
          "Implemented path tracer for advanced global illumination",
          "Integrated hemispherical calculations for light-surface interactions",
          "Applied photon mapping techniques for realistic rendering",
          "Adopted CUDA multithreading for real-time Cornell box scenes",
        ],
        link: "/work/monte-carlo-ray-tracer",
      },
      {
        title: "Xiangqi AI",
        timeframe: "Sep - Oct 2024",
        description:
          "Chinese Chess AI system using Deep Q-Networks with CUDA acceleration",
        technologies: ["C++", "CUDA", "Qt", "Deep Learning", "DQN"],
        achievements: [
          "Developed AI system using Deep Q-Networks without external ML libraries",
          "Implemented complete game logic and Qt-based GUI",
          "Designed neural network architecture with experience replay",
          "Integrated CUDA for parallel computing acceleration",
        ],
        link: "/work/xiangqi_ai",
      },
      {
        title: "Retro Vault",
        timeframe: "Sep - Oct 2023",
        description: "2D platform puzzle game with innovative clone mechanics",
        technologies: ["Unity", "C#", "Game Development"],
        achievements: [
          "Developed character logic and animation systems",
          "Implemented level infrastructure and puzzle mechanics",
          "Created clone mechanic for 10-second action replay",
          "Designed cooperative puzzle mechanics",
        ],
        link: "/work/retrovault",
      },
      {
        title: "Water Simulation",
        timeframe: "2023",
        description: "Particle-based water simulation using SPH algorithm",
        technologies: ["OpenGL", "C++", "CUDA", "SPH"],
        achievements: [
          "Implemented SPH algorithm for particle-based water simulation",
          "Created water free-fall scene with dynamic spotlight",
          "Implemented Phong illumination model and skybox",
          "Added user-controlled camera system",
        ],
        link: "/work/SPH_water_simulation",
      },
      {
        title: "Analysis of Skiing Action",
        timeframe: "2021",
        description: "Real-time skiing movement classifier using AI",
        technologies: ["Python", "OpenPose", "STGCN", "Computer Vision"],
        achievements: [
          "Developed classifier with 80% accuracy using STGCN",
          "Integrated OpenPose for skeleton coordinate extraction",
          "Implemented feature extraction and classification",
          "Published academic paper on the implementation",
        ],
        link: "/work/skiing",
      },
      {
        title: "Martial Arts Arena Fighting Robot",
        timeframe: "2019",
        description: "Award-winning autonomous combat robot",
        technologies: ["C", "STM32", "Embedded Systems"],
        achievements: [
          "Won third prize in 2019 China Robotics Cup",
          "Programmed sophisticated algorithms for STM32 microcontroller",
          "Implemented obstacle avoidance and attack strategies",
          "Led software development and system integration",
        ],
        link: "/work/robot",
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

export { person, social, home, about, blog, work, github };
