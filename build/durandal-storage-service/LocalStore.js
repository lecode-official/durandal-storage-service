///<amd-module name='durandal-storage-service/LocalStore'/>
define("durandal-storage-service/LocalStore", ["require", "exports", "durandal-storage-service/StorageSerializer", "store2"], function (require, exports, StorageSerializer, store2) {
    "use strict";
    // #endregion
    /**
     * Represents a store that stores values in local scope, which means persistently.
     */
    var LocalStore = /** @class */ (function () {
        function LocalStore() {
        }
        // #region Public Methods
        /**
         * Gets a value that has been stored to the given key. If the key is not found, null is returned.
         * @param {string} key The key at which the value has been stored.
         * @return {T|null} Returns the value at the given key.
         */
        LocalStore.prototype.get = function (key) {
            if (!store2.local.has(window.location.host + ":" + key)) {
                return null;
            }
            else {
                return StorageSerializer.deserialize(store2.local.get(window.location.host + ":" + key));
            }
        };
        /**
         * Stores the given value at the specified key. If null is provided as value, the entry is removed from the store.
         * @param {string} key The key at which the value should be stored.
         * @param {T|null} value The value that should be stored.
         */
        LocalStore.prototype.store = function (key, value) {
            if (!value) {
                store2.local.remove(window.location.host + ":" + key);
            }
            else {
                store2.local.set(window.location.host + ":" + key, StorageSerializer.serialize(value));
            }
        };
        return LocalStore;
    }());
    return LocalStore;
});
