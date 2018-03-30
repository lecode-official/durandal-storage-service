
///<amd-module name='durandal-storage-service/IStore'/>

/**
 * Represents a store that stores values.
 */
interface IStore {

    // #region Public Methods
    
    /**
     * Gets a value that has been stored to the given key. If the key is not found, null is returned.
     * @param {string} key The key at which the value has been stored. 
     * @return {T|null} Returns the value at the given key.
     */
    get<T>(key: string): T|null;

    /**
     * Stores the given value at the specified key. If null is provided as value, the entry is removed from the store.
     * @param {string} key The key at which the value should be stored. 
     * @param {T|null} value The value that should be stored. 
     */
    store<T>(key: string, value: T|null): void;

    // #endregion
}

// Exports the module, so that it can be loaded by Require
export = IStore;