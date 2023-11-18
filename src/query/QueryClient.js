// Fixme for register and deregister we are using a "name" to identify the callbacks
//  we should have some sort of different hash to keep it sane?
export default class QueryClient {

	#cachedQueries = new Map();
	#callbacks = new Map();

	constructor() {}

	register(key, name, callback) {
		if (!this.#callbacks.has(key)) {
			this.#callbacks.set(key, [{name: name, callback: callback}]);
		}
		else {
			let array = this.#callbacks.get(key);
			array.push({name: name, callback: callback});
			this.#callbacks.set(key, array);
		}
	}

	deregister(key, name) {
		const newArr = this.#callbacks.get(key).filter(element => element.name !== name);
		this.#callbacks.set(key, newArr);
	}

	cacheQuery(key, data) {
		this.#cachedQueries.set(key, data);
		this.#callbacks.get(key)?.forEach(val => val?.callback(data));
	}

	clearFromCache(key) {
		this.#cachedQueries.delete(key);
	}

	hasCacheFor(key) {
		return this.#cachedQueries.has(key);
	}

	getFromCache(key) {
		return this.#cachedQueries.get(key);
	}
}