import {Query} from "./QueryClient";

export default class QueryObserver {

	#queryKey;
	#queryFn;
	#queryAge;
	#queryClient;

	#result = Query.initialResult();

	constructor(queryKey, queryFn, queryAge, queryClient) {
		this.#queryKey = queryKey;
		this.#queryFn = queryFn;
		this.#queryAge = queryAge;
		this.#queryClient = queryClient;
	}

	/**
	 * Subscribe to the change of a query specified by the queryKey
	 *
	 * @param listener the function which will be executed when the result changes
	 * @returns a function to unsubscribe
	 */
	register(listener) {
		// set any data which might already be in the cache
		this.#setResult(this.#queryClient.getCachedResult(this.#queryKey));

		// the callback updates the internal result and calls the subscriber function
		const callback = (result) => {
			this.#setResult(result);
			listener();
		};

		return this.#queryClient.register(this.#queryKey, this.#queryFn, this.#queryAge, callback);
	}

	/**
	 * Copy over the result from the query and add the required functions
	 * FIXME maybe this could be part of the query itself and all observers get the same result object
	 *  but how would the refetch function get the queryKey and queryFn? and would it be a problem to have the same
	 *  data result in all observers?
	 *
	 * @param result the result containing all query values and functions
	 */
	#setResult(result) {
		if (!result) return;

		this.#result = {
			...result,
			refetch: () => this.#queryClient.refetch(this.#queryKey, this.#queryFn)
		};
	}

	getResult() {
		return this.#result;
	}
}