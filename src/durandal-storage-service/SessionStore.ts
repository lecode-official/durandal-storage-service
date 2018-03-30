
///<amd-module name='durandal-storage-service/SessionStore'/>

// #region Import Directives

import IStore = require("durandal-storage-service/IStore");
import StorageSerializer = require("durandal-storage-service/StorageSerializer");
import store2 = require("store2");

// #endregion

/**
 * Represents a store that stores values in session scope.
 */
class SessionStore implements IStore {

    // #region Public Methods
    
    /**
     * Gets a value that has been stored to the given key. If the key is not found, null is returned.
     * @param {string} key The key at which the value has been stored. 
     * @return {T|null} Returns the value at the given key.
     */
    public get<T>(key: string): T|null {
        if (!store2.session.has(window.location.host + ":" + key)) {
            return null;
        } else {
            return StorageSerializer.deserialize(store2.session.get(window.location.host + ":" + key));
        }
    }

    /**
     * Stores the given value at the specified key. If null is provided as value, the entry is removed from the store.
     * @param {string} key The key at which the value should be stored. 
     * @param {T|null} value The value that should be stored. 
     */
    public store<T>(key: string, value: T|null) {
        if (!value) {
            store2.session.remove(window.location.host + ":" + key);
        } else {
            store2.session.set(window.location.host + ":" + key, StorageSerializer.serialize(value));
        }
    }

    // #endregion
}

// Exports the module, so that it can be loaded by Require
export = SessionStore;