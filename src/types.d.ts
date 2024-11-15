export type AuthToken = {
	token: string
}

export type Forum =  {
	name: string
	posts: string
	latestPost?: Post
}

export type Thread = {
	title: string
	initialMessage: Post
}

export type Post = {
	author: string
}

export type User = {
	name: string
	flair: string
	pic: string
}