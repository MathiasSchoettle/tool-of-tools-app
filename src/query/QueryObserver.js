import {Query} from "./QueryClient";

export default class QueryObserver {

	#queryKey;
	#queryFn;
	#queryAge;
	#queryClient;
	#refetch;

	#result = Query.initialResult();

	constructor(queryKey, queryFn, queryAge, queryClient) {
		this.#queryKey = queryKey;
		this.#queryFn = queryFn;
		this.#queryAge = queryAge;
		this.#queryClient = queryClient;
		this.#refetch = () => this.#queryClient.refetch(this.#queryKey, this.#queryFn);
	}

	/**
	 * Subscribe to the change of a query specified by the queryKey
	 *
	 * @param listener the function which will be executed when the result changes
	 * @returns a function to unsubscribe
	 */
	register(listener) {

		// the callback updates the internal result and calls the subscriber function
		const callback = (result) => {
			this.#setResult(result);
			listener();
		};

		// set any data which might already be in the cache
		this.#setResult(this.#queryClient.getCachedResult(this.#queryKey));

		return this.#queryClient.register(this.#queryKey, this.#queryFn, this.#queryAge, callback);
	}

	#setResult(result) {
		if (!result) return;

		this.#result = {
			...structuredClone(result),
			refetch: this.#refetch
		};
	}

	getResult() {
		return this.#result;
	}
}