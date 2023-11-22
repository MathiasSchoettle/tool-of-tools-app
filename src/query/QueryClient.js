
const StatusType = {
	Success: "SUCCESS",
	Pending: "PENDING",
	Error: "ERROR"
}

export class Query {
	#data = undefined;
	#status = StatusType.Pending;
	#isFetching = false;

	#listeners = [];

	fetch(queryFn) {

		// prevent simultaneous fetches
		if (this.#isFetching) return;

		this.#isFetching = true;
		this.#listeners.forEach(listener => listener(this.getResult()));

		queryFn()
			.then(data => {
				this.#data = data;
				this.#status = StatusType.Success;
			})
			.catch(error => {
				// TODO set error
				this.#status = StatusType.Error;
			})
			.finally(() => {
				this.#isFetching = false;
				this.#listeners.forEach(listener => listener(this.getResult()));
			});
	}

	getResult() {
		return {
			data: this.#data,
			isFetching: this.#isFetching,
			isPending: this.#status === StatusType.Pending,
			isSuccess: this.#status === StatusType.Success,
			isError: this.#status === StatusType.Error
		}
	}

	static initialResult() {
		return {
			data: undefined,
			isFetching: true,
			isPending: true,
			isSuccess: false,
			isError: false
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