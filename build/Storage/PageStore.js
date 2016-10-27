///<amd-module name='Storage/PageStore'/>
define("Storage/PageStore", ["require", "exports", "Storage/StorageSerializer"], function (require, exports, StorageSerializer) {
    "use strict";
    // #endregion
    /**
     * Represents a store that stores values in page scope, which means the data is lost when the page is closed.
     */
    var PageStore = (function () {
        function PageStore() {
            // #region Private Fields
            /**
             * Contains the dictionary that stores the values
             */
            this.pageStore = {};
        }
        // #endregion
        // #region Public Methods
        /**
         * Gets a value that has been stored to the given key. If the key is not found, null is returned.
         * @param {string} key The key at which the value has been stored.
         * @return {T|null} Returns the value at the given key.
         */
        PageStore.prototype.get = function (key) {
            if (!this.pageStore[window.location.host + ":" + key]) {
                return null;
            }
            else {
                return StorageSerializer.deserialize(this.pageStore[window.location.host + ":" + key]);
            }
        };
        /**
         * Stores the given value at the specified key. If null is provided as value, the entry is removed from the store.
         * @param {string} key The key at which the value should be stored.
         * @param {any} value The value that should be stored.
         */
        PageStore.prototype.store = function (key, value) {
            if (!value) {
                this.pageStore[window.location.host + ":" + key] = null;
            }
            else {
                this.pageStore[window.location.host + ":" + key] = StorageSerializer.serialize(value);
            }
        };
        return PageStore;
    }());
    return PageStore;
});
