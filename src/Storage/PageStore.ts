
///<amd-module name='Storage/PageStore'/>

// #region Import Directives

/// <reference path="../Typings/References.d.ts" />

import IStore = require("Storage/IStore");
import StorageSerializer = require("Storage/StorageSerializer");

// #endregion

/**
 * Represents a store that stores values in page scope, which means the data is lost when the page is closed.
 */
class PageStore implements IStore {

    // #region Private Fields

    /**
     * Contains the dictionary that stores the values
     */
    private pageStore: { [key: string]: any; } = { };

    // #endregion

    // #region Public Methods
    
    /**
     * Gets a value that has been stored to the given key. If the key is not found, null is returned.
     * @param {string} key The key at which the value has been stored. 
     * @return {T|null} Returns the value at the given key.
     */
    public get<T>(key: string): T|null {
        if (!this.pageStore[window.location.host + ":" + key]) {
            return null;
        } else {
            return StorageSerializer.deserialize(this.pageStore[window.location.host + ":" + key]);
        }
    }

    /**
     * Stores the given value at the specified key. If null is provided as value, the entry is removed from the store.
     * @param {string} key The key at which the value should be stored. 
     * @param {T|null} value The value that should be stored. 
     */
    public store<T>(key: string, value: T|null) {
        if (!value) {
            this.pageStore[window.location.host + ":" + key] = null;
        } else {
            this.pageStore[window.location.host + ":" + key] = StorageSerializer.serialize(value);
        }
    }

    // #endregion
}

// Exports the module, so that it can be loaded by Require
export = PageStore;