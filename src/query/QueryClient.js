
// Fixme for register and deregister we are using a "name" to identify the callbacks
//  we should have some sort of different hash to keep it sane?
export default class QueryClient {

	#cache = new Map();

	constructor() {}

	register(key, name, callback) {
		if (!this.#cache.has(key)) {
			this.#cache.set(key, {
				callbacks: new Map(),
				data: undefined
			});
		}

		this.#cache.get(key).callbacks.set(name, callback);
	}

	deregister(key, name) {
		if (this.#cache.has(key))
			this.#cache.get(key).callbacks.delete(name);
	}

	cacheQuery(key, data) {
		const obj = this.#cache.get(key);
		obj.data = data;
		obj.callbacks.forEach((callback) => {
			callback(obj.data);
		});
	}

	clearFromCache(key) {
		if (this.#cache.has(key))
			this.#cache.get(key).data = undefined;
	}

	hasCacheFor(key) {
		return this.#cache.get(key).data !== undefined;
	}

	getFromCache(key) {
		return this.#cache.get(key).data;
	}
}