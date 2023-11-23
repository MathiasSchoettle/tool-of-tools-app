
const StatusType = {
	Success: "SUCCESS",
	Pending: "PENDING",
	Error: "ERROR"
}

export class Query {
	#data = undefined;
	#status = StatusType.Pending;
	#error = undefined;
	#isFetching = false;
	#lastFetch;

	#listeners = [];

	fetch(queryFn, queryAge) {

		if (this.#lastFetch && (Date.now() - this.#lastFetch) < queryAge) {
			this.#notify();
			return;
		}

		// prevent simultaneous fetches
		if (this.#isFetching) return;

		this.#isFetching = true;
		this.#notify();

		queryFn()
			.then(data => {
				this.#error = undefined;
				this.#data = data;
				this.#status = StatusType.Success;
				this.#lastFetch = Date.now();
			})
			.catch(error => {
				this.#error = error.message;
				this.#status = StatusType.Error;
			})
			.finally(() => {
				this.#isFetching = false;
				this.#notify();
			});
	}

	refetch(queryFn) {
		if (this.#isFetching) return;
		this.fetch(queryFn, 0);
	}

	#notify() {
		this.#listeners.forEach(listener => listener(this.getResult()));
	}

	getResult() {
		return {
			data: this.#data,
			error: this.#error,
			isFetching: this.#isFetching,
			isPending: this.#status === StatusType.Pending,
			isSuccess: this.#status === StatusType.Success,
			isError: this.#status === StatusType.Error,
		}
	}

	static initialResult() {
		return {
			data: undefined,
			error: undefined,
			isFetching: true,
			isPending: true,
			isSuccess: false,
			isError: false,
		}
	}

	addListener(listener) {
		this.#listeners = [...this.#listeners, listener];
	}

	removeListener(listener) {
		this.#listeners = this.#listeners.filter(l => l !== listener);
	}
}

export default class QueryClient {

	#queryCache = new Map();

	register(queryKey, queryFn, queryAge, listener) {

		// add new query if absent
		if (!this.#queryCache.has(queryKey)) this.#queryCache.set(queryKey, new Query());

		const query = this.#queryCache.get(queryKey);
		query.addListener(listener);

		queryAge = queryAge ?? 0;
		query.fetch(queryFn, queryAge);

		return () => query.removeListener(listener);
	}

	refetch(queryKey, queryFn) {
		this.#queryCache.get(queryKey).refetch(queryFn);
	}

	getCachedResult(queryKey) {
		return this.#queryCache.get(queryKey)?.getResult();
	}
}