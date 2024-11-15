import { AuthToken, Forum, Post } from "./types"

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
		return []
	}

	async getThreads(forum: string, page: number = 0): Promise<Forum[]> {
		return []
	}

	async getThread(forum: string, thread: string, page: number = 0): Promise<Post[]> {
		return []
	}
}