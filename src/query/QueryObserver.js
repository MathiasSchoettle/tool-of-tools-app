
export default class QueryObserver {

	#queryKey;
	#queryFn;
	#queryClient;
	#result = {
		data: undefined
	}

	constructor(queryKey, queryFn, queryClient) {
		this.#queryKey = queryKey;
		this.#queryFn = queryFn;
		this.#queryClient = queryClient;
	}

	register(listener) {
		const callback = (result) => {
			this.#result = result;
			listener();
		};

		const result = this.#queryClient.getCachedResult(this.#queryKey);
		if (result) this.#result = structuredClone(result);

		return this.#queryClient.register(this.#queryKey, this.#queryFn, callback);
	}

	getResult() {
		return this.#result;
	}
}