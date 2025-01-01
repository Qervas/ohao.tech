import { sendNewsletter } from "../lib/newsletter";
import { getPosts } from "../app/utils/utils";

async function main() {
  // Get the most recent post
  const posts = getPosts(["src", "app", "[locale]", "blog", "posts", "en"]);
  const latestPost = posts[0]; // Assuming posts are already sorted by date

  if (!latestPost) {
    console.log("No posts found");
    process.exit(1);
  }

  const subject = `New Post: ${latestPost.metadata.title}`;

  // Create email content from the post
  const content = `
    <h2>${latestPost.metadata.title}</h2>
    <p>${latestPost.metadata.summary}</p>
    ${latestPost.metadata.image ? `<img src="https://ohao.tech${latestPost.metadata.image}" alt="${latestPost.metadata.title}"/>` : ""}
    <p>Read the full post at: <a href="https://ohao.tech/blog/${latestPost.slug}">https://ohao.tech/blog/${latestPost.slug}</a></p>
  `;

  try {
    await sendNewsletter(subject, content);
    console.log("Newsletter sent successfully!");
  } catch (error) {
    console.error("Failed to send newsletter:", error);
  }

  process.exit(0);
}

main();
