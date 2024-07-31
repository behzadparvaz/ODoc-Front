/**
 * @function
 * @type {*|null}
 * @name clearStorage
 * @return clear keys from local storage
 */
export const clearStorage = () => ((typeof window !== 'undefined') ? window.localStorage.clear() : null)
/**
 * @function
 * @type {*|null}
 * @name getItem
 * @param key
 * @return get values of a key from local storage
 */
export const getItem = (key: string) => ((typeof window !== 'undefined') ? window.localStorage.getItem(key) : null)
/**
 * @function
 * @type {*|null}
 * @name setItem
 * @param key
 * @param value
 * @return set values of a key in local storage
 */
export const setItem = (key: string, value: string) => ((typeof window !== 'undefined') ? window.localStorage.setItem(key, value) : null)
/**
 * @function
 * @type {*|null}
 * @name removeItem
 * @param key
 * @return remove an item from local storage by key
 */
export const removeItem = (key: string) => ((typeof window !== 'undefined') ? window.localStorage.removeItem(key) : null)
