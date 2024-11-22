import { AuthToken, Forum, Post, Thread } from "./types"

export default class ApiClient {
	public test: number

	constructor(test: number = 5) {
		this.test = test
	}

	async register(username: string, password: string) {
	
	}

	async login(username: string, password: string): Promise<AuthToken> {
		return {
			token: username + password
		}
	}
	
	async logout() {

	}

	async getFeed(page: number = 0): Promise<Post[]> {
		return []
	}

	async getForums(page: number = 9): Promise<Forum[]> {
		return [
			{
				id: 1,
				postCount: 1,
				name: 'All about cooking',
				lastUpdatedThread: {
					id: 15,
					title: 'okok',
					replyCount: 2,
					initialPost: {
						id: 1,
						author: {
							id: 10,
							name: "user1",
							flair: "I'm cool",
							"pic": "https://i.imgur.com/WTHmNqR.png"
						},
						time: 12,
						content: "Test Title"
					}
				},
				icon: "https://i.imgur.com/WTHmNqR.png"
			}
		]
	}

	async getForum(forum: string): Promise<Forum> {
		return {
			id: 1,
			postCount: 1,
			name: 'All about cooking',
			lastUpdatedThread: {
				id: 15,
				title: 'okok',
				replyCount: 2,
				initialPost: {
					id: 1,
					author: {
						id: 10,
						name: "user1",
						flair: "I'm cool",
						"pic": "https://i.imgur.com/WTHmNqR.png"
					},
					time: 12,
					content: "Test Title"
				}
			},
			icon: "https://i.imgur.com/WTHmNqR.png"
		}
	}

	async getThreads(forum: string, page: number = 0): Promise<Thread[]> {
		return [
			{
				id: 15,
				title: 'Interested in cooking',
				replyCount: 2,
				initialPost: {
					id: 1,
					author: {
						id: 10,
						name: "user1",
						flair: "I'm cool",
						"pic": "https://i.imgur.com/WTHmNqR.png"
					},
					time: 12,
					content: "Interested in cooking"
				}
			},
			{
				id: 17,
				title: 'Anyone got good receipes',
				replyCount: 2,
				initialPost: {
					id: 1,
					author: {
						id: 10,
						name: "user1",
						flair: "I'm cool",
						"pic": "https://i.imgur.com/WTHmNqR.png"
					},
					time: 12,
					content: "I'm starving help"
				}
			}
		]
	}

	async getThread(forum: string, thread: string): Promise<Thread> {
		return {
			id: 15,
			title: 'okok',
			replyCount: 2,
			initialPost: {
				id: 1,
				author: {
					id: 10,
					name: "user1",
					flair: "I'm cool",
					pic: "https://i.imgur.com/WTHmNqR.png"
				},
				time: 12,
				content: "Test Title"
			},
			parentForum: {
				id: 1,
				postCount: 1,
				name: 'All about cooking',
				lastUpdatedThread: {
					id: 15,
					title: 'okok',
					replyCount: 2,
					initialPost: {
						id: 1,
						author: {
							id: 10,
							name: "user1",
							flair: "I'm cool",
							"pic": "https://i.imgur.com/WTHmNqR.png"
						},
						time: 12,
						content: "Test Title"
					}
				},
				icon: "https://i.imgur.com/WTHmNqR.png"
			}
		}
	}

	async getReplies(forum: string, thread: string, page: number): Promise<Post[]> {
		return [
			{
				id: 1,
				author: {
					id: 10,
					name: "user1",
					flair: "I'm cool",
					"pic": "https://i.imgur.com/WTHmNqR.png"
				},
				time: 12,
				content: "Test Title"
			},
			{
				id: 14,
				author: {
					id: 12,
					name: "user2",
					flair: "I'm cool",
					"pic": "https://i.imgur.com/WTHmNqR.png"
				},
				time: 12,
				content: "Test\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\n"
			}
		]
	}
}