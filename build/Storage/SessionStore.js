///<amd-module name='Storage/SessionStore'/>
define("Storage/SessionStore", ["require", "exports", "Storage/StorageSerializer", "store2"], function (require, exports, StorageSerializer, store2) {
    "use strict";
    // #endregion
    /**
     * Represents a store that stores values in session scope.
     */
    var SessionStore = (function () {
        function SessionStore() {
        }
        // #region Public Methods
        /**
         * Gets a value that has been stored to the given key. If the key is not found, null is returned.
         * @param {string} key The key at which the value has been stored.
         * @return {T|null} Returns the value at the given key.
         */
        SessionStore.prototype.get = function (key) {
            if (!store2.session.has(window.location.host + ":" + key)) {
                return null;
            }
            else {
                return StorageSerializer.deserialize(store2.session.get(window.location.host + ":" + key));
            }
        };
        /**
         * Stores the given value at the specified key. If null is provided as value, the entry is removed from the store.
         * @param {string} key The key at which the value should be stored.
         * @param {any} value The value that should be stored.
         */
        SessionStore.prototype.store = function (key, value) {
            if (!value) {
                store2.session.remove(window.location.host + ":" + key);
            }
            else {
                store2.session.set(window.location.host + ":" + key, StorageSerializer.serialize(value));
            }
        };
        return SessionStore;
    }());
    return SessionStore;
});