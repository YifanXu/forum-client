export type AuthToken = {
	username: string,
	token: string
}

export type Forum =  {
	id: number,
	name: string,
	description: string,
	threadCount: number,
	lastUpdatedThread?: Thread,
	icon: string
}

export type Thread = {
	parentForum?: Forum,
	id: number,
	title: string,
	initialPost: Post,
	lastPost: Post,
	replyCount: number,
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