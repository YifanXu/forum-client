import { AuthToken, Forum, ForumStats, Post, Thread, User } from "./types"
import { Cloudinary } from '@cloudinary/url-gen';

export default class ApiClient {
	private session: () => AuthToken | null
	private setSession: (session: AuthToken|null) => void
	public cloudinary: Cloudinary

	constructor(session: () => AuthToken | null, setSession: (session: AuthToken|null) => void) {
		this.session = session
		this.setSession = setSession
		this.cloudinary = new Cloudinary({ cloud: { cloudName: 'dztsw0f2i' } });
	}

	// #region auth
	async register(username: string, password: string) {
		// api call
	}

	async login(username: string, password: string): Promise<AuthToken> {
		const s = {
			user: {
				id: 10,
				name: "user1",
				flair: "I'm cool",
				profilePic: "vaqwtjn5wytcresydksu"
			},
			token: username + password,
			expireAt: 0
		}
		this.setSession(s)
		return s
	}
	
	async logout() {
		this.setSession(null)
	}
	//#endregion auth

	//#region getters

	// feel free to cache the stats in memory in backend or something
	async getForumStats(): Promise<ForumStats> {
		return {
			totalUsers: 5,
			totalThreads: 10,
			totalPosts: 20,
			latestThreads: [
				{
					id: 15,
					title: 'Interested in cooking a really big turkey for you and all my families',
					parentForumId: 1,
					parentForumName: 'All about Cooking',
					postCount: 2,
					initialPost: {
						id: 1,
						author: {
							id: 10,
							name: "user1",
							flair: "I'm cool",
							profilePic: "vaqwtjn5wytcresydksu"
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
							profilePic: "vaqwtjn5wytcresydksu"
						},
						time: 1733282608686,
						content: "Test Title"
					}
				}
			]
		}
	}

	// get new threads on subscribed forums
	async getThreadFeed(page: number = 0): Promise<Thread[]> {
		return []
	}

	// get new posts on subscribed threads
	// posts must be after subscription, descending by time
	async getPostFeed(page: number = 0): Promise<Post[]> {
		return [
			{
				id: 1,
				author: {
					id: 10,
					name: "user1",
					flair: "I'm cool",
					profilePic: "vaqwtjn5wytcresydksu"
				},
				time: 1733282608686,
				content: "Test Title",
				parentThreadForumId: 1,
				parentThreadForum: 'All about cooking',
				parentThreadId: 1,
				parentThreadTitle: 'Cooking'
			}
		]
	}

	// get all forums on the site
	async getForums(): Promise<Forum[]> {
		return [
			{
				id: 1,
				threadCount: 10231,
				name: 'All about cooking',
				description: 'Cooking related content',
				lastUpdatedThread: {
					id: 15,
					title: 'Interested in cooking',
					postCount: 2,
					initialPost: {
						id: 1,
						author: {
							id: 10,
							name: "user1",
							flair: "I'm cool",
							profilePic: "vaqwtjn5wytcresydksu"
						},
						time: 1733282608686,
						content: "Comon "
					},
					lastPost: {
						id: 1,
						author: {
							id: 10,
							name: "user1",
							flair: "I'm cool",
							profilePic: "vaqwtjn5wytcresydksu"
						},
						time: 1733282608686,
						content: "Test Title"
					}
				},
				icon: "vaqwtjn5wytcresydksu"
			}
		]
	}

	// get information on forum by forumId
	async getForum(forumId: string): Promise<Forum> {
		return {
			id: 1,
			threadCount: 1,
			name: 'All about cooking',
			description: 'Cooking related content',
			lastUpdatedThread: {
				id: 15,
				title: 'Interested in cooking',
				postCount: 2,
				initialPost: {
					id: 1,
					author: {
						id: 10,
						name: "user1",
						flair: "I'm cool",
						profilePic: "vaqwtjn5wytcresydksu"
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
						profilePic: "vaqwtjn5wytcresydksu"
					},
					time: 1733282608686,
					content: "Test Title"
				}
			},
			icon: "vaqwtjn5wytcresydksu"
		}
	}

	// get threads in a forum
	async getThreads(forumId: string, page: number = 0): Promise<Thread[]> {
		return [
			{
				id: 15,
				title: 'Interested in cooking',
				postCount: 2,
				initialPost: {
					id: 1,
					author: {
						id: 10,
						name: "user1",
						flair: "I'm cool",
						profilePic: "vaqwtjn5wytcresydksu"
					},
					time: 12,
					content: "Interested in cooking. I am actually so interested i am going to write a really long blob of garbage to test your website layout."
				},
				lastPost: {
					id: 1,
					author: {
						id: 10,
						name: "user1",
						flair: "I'm cool",
						profilePic: "vaqwtjn5wytcresydksu"
					},
					time: 1733282608686,
					content: "Test Title"
				}
			},
			{
				id: 17,
				title: 'Anyone got good receipes',
				postCount: 2,
				initialPost: {
					id: 1,
					author: {
						id: 10,
						name: "user1",
						flair: "I'm cool",
						profilePic: "vaqwtjn5wytcresydksu"
					},
					time: 12,
					content: "<p>2njnfakwjfnakjnwf</p><p>njkfawkfnajkwn</p>"
				},
				lastPost: {
					id: 1,
					author: {
						id: 10,
						name: "user1",
						flair: "I'm cool",
						profilePic: "vaqwtjn5wytcresydksu"
					},
					time: 1733282608686,
					content: "Test Title"
				}
			}
		]
	}

	// get specific thread by threadId
	async getThread(forumId: string, threadId: string): Promise<Thread> {
		return {
			id: 15,
			title: 'Interested in cooking',
			parentForumId: 1,
			parentForumName: 'All about Cooking',
			postCount: 2,
			initialPost: {
				id: 1,
				author: {
					id: 10,
					name: "user1",
					flair: "I'm cool",
					profilePic: "vaqwtjn5wytcresydksu"
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
					profilePic: "vaqwtjn5wytcresydksu"
				},
				time: 1733282608686,
				content: "Test Title"
			}
		}
	}

	// get posts in a thread. Include the initial and last post
	async getPosts(forumId: string, threadId: string, page: number): Promise<Post[]> {
		return [
			{
				id: 1,
				author: {
					id: 10,
					name: "user1",
					flair: "I'm cool",
					profilePic: "vaqwtjn5wytcresydksu"
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
					profilePic: "vaqwtjn5wytcresydksu"
				},
				time: 12,
				content: "Test\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\n"
			}
		]
	}

	// get user by user id
	async getUser(userId: string): Promise<User> {
		return {
			id: 10,
			name: "user1",
			flair: "I'm cool",
			profilePic: "vaqwtjn5wytcresydksu",
			registered: 15,
			threadCount: 2,
			postCount: 17
		}
	}

	// get all users posts across threads and forums, ordered descending by time
	async getUserPosts(userId: string): Promise<Post[]> {
		return [
			{
				id: 1,
				author: {
					id: 10,
					name: "user1",
					flair: "I'm cool",
					profilePic: "vaqwtjn5wytcresydksu"
				},
				time: 12,
				content: "Test Title",
				parentThreadForum: 'All about Cooking',
				parentThreadId: 5,
				parentThreadTitle: 'Interested in Cooking'
			},
			{
				id: 14,
				author: {
					id: 12,
					name: "user2",
					flair: "I'm cool",
					profilePic: "vaqwtjn5wytcresydksu"
				},
				time: 12,
				content: "Test\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\nTest\n",
				parentThreadForum: 'All about Cooking',
				parentThreadId: 5,
				parentThreadTitle: 'Interested in Cooking'
			}
		]
	}

	//#endregion getters

	// #region mutators
	// update the current user with new attributes
	async updateUser(user: User): Promise<User> {
		return {
			id: 10,
			name: "user1",
			flair: "I'm cool",
			profilePic: "vaqwtjn5wytcresydksu"
		}
	}

	// create a new thread in a specified forum
	async createThread(forumId: number, title: string, content: string): Promise<Thread> {
		return {
			id: 15,
			title: 'Interested in cooking',
			postCount: 2,
			initialPost: {
				id: 1,
				author: {
					id: 10,
					name: "user1",
					flair: "I'm cool",
					profilePic: "vaqwtjn5wytcresydksu"
				},
				time: 12,
				content: "Test Title"
			},
			parentForumId: 1,
			parentForumName: 'All about Cooking',
			lastPost: {
				id: 1,
				author: {
					id: 10,
					name: "user1",
					flair: "I'm cool",
					profilePic: "vaqwtjn5wytcresydksu"
				},
				time: 1733282608686,
				content: "Test Title"
			}
		}
	}

	// add a reply to a specific thread
	async replyToThread(threadId: number, content: string): Promise<Post> {
		return {
			id: 1,
			author: {
				id: 10,
				name: "user1",
				flair: "I'm cool",
				profilePic: "vaqwtjn5wytcresydksu"
			},
			time: 12,
			content: "Test Title"
		}
	}

	// Set whether the active user is subscribed to a specific forum
	async setForumSubscription(forumId: string, subscribed: boolean): Promise<void> {

	}

	// Set whether the active user is subscribed to a specific thread
	async setThreadSubscription(threadId: string, subscribed: boolean): Promise<void> {

	}

	//#endregion mutators
}