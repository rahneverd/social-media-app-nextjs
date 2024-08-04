// import type {
//   Comment,
//   Follows,
//   Like,
//   Post,
//   SavedPost,
//   User,
// } from "@prisma/client";

export type CommentWithExtras = any;
// Comment & { user: any };
// User
export type LikeWithExtras = any;
// Like & { user: User };

export type PostWithExtras = any;
// Post & {
//   comments: CommentWithExtras[];
//   likes: LikeWithExtras[];
//   savedBy: SavedPost[];
//   user: User;
// };

export type UserWithFollows = any;
// User & {
//   following: Follows[];
//   followedBy: Follows[];
// };

export type FollowerWithExtras = any;
// Follows & { follower: UserWithFollows };
export type FollowingWithExtras = any;
// Follows & { following: UserWithFollows };

export type UserWithExtras = any;
// User & {
//   posts: Post[];
//   saved: SavedPost[];
//   followedBy: FollowerWithExtras[];
//   following: FollowingWithExtras[];
// };
