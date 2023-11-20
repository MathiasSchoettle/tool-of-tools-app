import { v4 as uuid } from 'uuid';

// TODO refactor this when fully implemented
export default class QueryClient {

	#cache = new Map();

	static #CACHE_LIFETIME = 5000;

	constructor() {}

	register(key, callback) {
		const hash = uuid();

		if (!this.#cache.has(key)) {
			this.#cache.set(key, {
				callbacks: new Map(),
				data: undefined,
				timestamp: undefined
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
		obj.timestamp = Date.now();
	}

	clearFromCache(key) {
		if (this.#cache.has(key)) {
			const obj = this.#cache.get(key);
			obj.data = undefined;
			obj.timestamp = undefined;
		}
	}

	cacheIsStale(key) {
		if (this.#cache.has(key)) {
			const obj = this.#cache.get(key);
			if (!obj.timestamp) return true;
			const timeDelta = Date.now() - obj.timestamp;
			return timeDelta > QueryClient.#CACHE_LIFETIME;
		}

		return true;
	}

	getFromCache(key) {
		return this.#cache.get(key).data;
	}
}