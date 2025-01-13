import { getPosts } from "@/app/utils/utils";
import { Grid } from "@/once-ui/components";
import Post from "./Post";
import { useMemo } from "react";

export interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  locale: string;
  thumbnail?: boolean;
}

export const Posts: React.FC<PostsProps> = ({
  range,
  columns = "2",
  locale = "en",
  thumbnail = true,
}: PostsProps) => {
  const sortedBlogs = useMemo(() => {
    let allBlogs = getPosts([
      "src",
      "app",
      "[locale]",
      "blog",
      "posts",
      locale,
    ]);
    return allBlogs.sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    );
  }, [locale]);

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range[1])
    : sortedBlogs;

  return (
    <Grid columns={`repeat(${columns}, 1fr)`}>
      {displayedBlogs.map((post) => (
        <Post key={post.slug} post={post} thumbnail={thumbnail} />
      ))}
    </Grid>
  );
};
