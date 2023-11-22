
class Query {
	#data = undefined;
	#listeners = [];

	fetch(queryFn) {
		queryFn()
			.then(data => {
				this.#data = data;
			})
			.catch(error => {
				// TODO
			})
			.finally(() => {
				this.#listeners.forEach(listener => listener(this.getResult()));
			});
	}

	getResult() {
		return {
			data: this.#data
		}
	}

	addListener(listener) {
		this.#listeners = [...this.#listeners, listener];
	}

	removeListener(listener) {
		this.#listeners = this.#listeners.filter(l => l !== listener);
		console.log(this.#listeners)
	}
}

export default class QueryClient {

	#queryCache = new Map();

	register(queryKey, queryFn, listener) {

		// add new query if absent
		if (!this.#queryCache.has(queryKey)) this.#queryCache.set(queryKey, new Query());

		const query = this.#queryCache.get(queryKey);
		query.addListener(listener);
		query.fetch(queryFn);

		return () => query.removeListener(listener);
	}

	getCachedResult(queryKey) {
		return this.#queryCache.get(queryKey)?.getResult();
	}
}