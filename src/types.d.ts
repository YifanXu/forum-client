export type AuthToken = {
	user: User,
	token: string,
	expireAt: number,
}

export type ForumStats = {
	totalUsers: number,
	totalThreads: number,
	totalPosts: number,
	latestThreads: Thread[]
}

export type Forum =  {
	id: number,
	name: string,
	description: string,
	threadCount: number,
	icon: string

	// Include unless asking about a specific forum (getForum)
	lastUpdatedThread?: Thread,
}

export type Thread = {
	// Include unless asking for list of threads in a forum (getThreads)
	parentForumId?: number,
	parentForumName?: string,

	id: number,
	title: string,
	initialPost: Post,
	lastPost: Post,
	postCount: number,
}

export type Post = {
	// Include unless asking for a list of posts in thread (getReplies)
	parentThreadId?: number,
	parentThreadTitle?: string,
	parentThreadForum?: string,

	id: number,
	author: User,
	time: number,
	content: string
}

export type User = {
	id: number,
	name: string,
	flair: string,
	profilePic: string,

	// Only include when getting user by id (getuser)
	registered?: number,
	threadCount?: number,
	postCount?: number
}