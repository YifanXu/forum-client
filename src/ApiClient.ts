import { AuthToken, Forum, Post, Thread, User } from "./types"

export default class ApiClient {
	public test: number
	public session: AuthToken | null

	constructor(test: number = 5) {
		this.test = test
		this.session = null
	}

	// auth
	async register(username: string, password: string) {
		// api call
	}

	async login(username: string, password: string): Promise<AuthToken> {
		return this.session = {
			user: {
				id: 10,
				name: "user1",
				flair: "I'm cool",
				pic: "https://i.imgur.com/WTHmNqR.png"
			},
			token: username + password,
			expireAt: 0
		}
	}
	
	async logout() {
		this.session = null
	}


	// getters
	async getFeed(page: number = 0): Promise<Post[]> {
		return []
	}

	async getForums(page: number = 9): Promise<Forum[]> {
		return [
			{
				id: 1,
				threadCount: 10231,
				name: 'All about cooking',
				description: 'Cooking related content',
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
						time: 1733282608686,
						content: "Test Title"
					},
					lastPost: {
						id: 1,
						author: {
							id: 10,
							name: "user1",
							flair: "I'm cool",
							"pic": "https://i.imgur.com/WTHmNqR.png"
						},
						time: 1733282608686,
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
			threadCount: 1,
			name: 'All about cooking',
			description: 'Cooking related content',
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
				},
				lastPost: {
					id: 1,
					author: {
						id: 10,
						name: "user1",
						flair: "I'm cool",
						"pic": "https://i.imgur.com/WTHmNqR.png"
					},
					time: 1733282608686,
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
				},
				lastPost: {
					id: 1,
					author: {
						id: 10,
						name: "user1",
						flair: "I'm cool",
						"pic": "https://i.imgur.com/WTHmNqR.png"
					},
					time: 1733282608686,
					content: "Test Title"
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
				},
				lastPost: {
					id: 1,
					author: {
						id: 10,
						name: "user1",
						flair: "I'm cool",
						"pic": "https://i.imgur.com/WTHmNqR.png"
					},
					time: 1733282608686,
					content: "Test Title"
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
				threadCount: 1,
				name: 'All about cooking',
				description: 'Cooking related content',
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
					},
					lastPost: {
						id: 1,
						author: {
							id: 10,
							name: "user1",
							flair: "I'm cool",
							"pic": "https://i.imgur.com/WTHmNqR.png"
						},
						time: 1733282608686,
						content: "Test Title"
					}
				},
				icon: "https://i.imgur.com/WTHmNqR.png"
			},
			lastPost: {
				id: 1,
				author: {
					id: 10,
					name: "user1",
					flair: "I'm cool",
					"pic": "https://i.imgur.com/WTHmNqR.png"
				},
				time: 1733282608686,
				content: "Test Title"
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

	async getUser(id: number): Promise<User> {
		return {
			id: 10,
			name: "user1",
			flair: "I'm cool",
			pic: "https://i.imgur.com/WTHmNqR.png"
		}
	}

	async getUserPosts(id: number): Promise<Post[]> {
		return []
	}

	// mutators
	
}