import { LRUCache } from "lru-cache";

const options = {
  max: 10,
  ttl: 1000 * 60 * 5,
};

export const searchCache = new LRUCache(options);

export const categoryListCache = new LRUCache({
  max: 20,
  ttl: 1000 * 60 * 5,
});
