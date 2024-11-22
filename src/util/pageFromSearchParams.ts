export function pageFromSearchParams (searchParams: URLSearchParams): number {
	let current: number = 1
    if (searchParams.has('page')) {
        current = parseInt(searchParams.get('page') as string)
        if (isNaN(current)) {
            current = 1
        }
    }
	return current
}