import PostsGrid from '@/components/PostsGrid';
import { fetchPostsByUsername } from '@/lib/actions';
// import { fetchPostsByUsername } from "@/lib/data";

async function ProfilePage({
  params: { username }
}: {
  params: { username: string };
}) {
  const posts: any = await fetchPostsByUsername(username);
  console.log(posts);
  // await fetchPostsByUsername(username);

  return <PostsGrid posts={posts} />;
}

export default ProfilePage;
