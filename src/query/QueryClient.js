import { v4 as uuid } from 'uuid';

export default class QueryClient {

	#cache = new Map();

	constructor() {}

	register(key, callback) {
		const hash = uuid();

		if (!this.#cache.has(key)) {
			this.#cache.set(key, {
				callbacks: new Map(),
				data: undefined
			});
		}

		this.#cache.get(key).callbacks.set(hash, callback);

		return hash;
	}

	deregister(key, hash) {
		if (this.#cache.has(key))
			this.#cache.get(key).callbacks.delete(hash);
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