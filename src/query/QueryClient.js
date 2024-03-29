import Query from "./Query";

export default class QueryClient {

	#queryCache = new Map();

	register(queryKey, queryFn, queryAge, listener) {

		// add new query if absent
		if (!this.#queryCache.has(queryKey)) this.#queryCache.set(queryKey, new Query());

		const query = this.#queryCache.get(queryKey);
		query.addListener(listener);
		query.fetch(queryFn, queryAge ?? 0);

		return () => query.removeListener(listener);
	}

	refetch(queryKey, queryFn) {
		this.#queryCache.get(queryKey).refetch(queryFn);
	}

	getCachedResult(queryKey) {
		return this.#queryCache.get(queryKey)?.getResult();
	}
}