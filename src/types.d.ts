export type AuthToken = {
	token: string
}

export type Forum =  {
	id: number,
	name: string,
	postCount: number,
	lastUpdatedThread?: Thread,
	icon: string
}

export type Thread = {
	parentForum?: Forum,
	id: number,
	title: string,
	initialPost: Post,
	replyCount: number
}

export type Post = {
	id: number,
	author: User,
	time: number,
	content: string
}

export type User = {
	id: number,
	name: string,
	flair: string,
	pic: string
}