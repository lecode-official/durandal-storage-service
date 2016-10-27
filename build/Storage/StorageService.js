///<amd-module name='Storage/StorageService'/>
define("Storage/StorageService", ["require", "exports", "Globalization/DateTime", "Storage/LocalStore", "Globalization/Numeric", "Storage/PageStore", "Storage/SessionStore", "Storage/StorageKind", "Storage/StorageSerializer", "Globalization/TimeSpan"], function (require, exports, DateTime, LocalStore, Numeric, PageStore, SessionStore, StorageKind, StorageSerializer, TimeSpan) {
    "use strict";
    // #endregion
    /**
     * Represents a service that is used to store values in a persistent store.
     */
    var StorageService = (function () {
        function StorageService() {
        }
        Object.defineProperty(StorageService, "page", {
            // #endregion
            // #region Public Static Properties
            /**
             * Gets the store that is used to store values within page scope.
             */
            get: function () {
                return StorageService._page;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageService, "local", {
            /**
             * Gets the store that is used to store values within local scope, which means persistently.
             */
            get: function () {
                return StorageService._local;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StorageService, "session", {
            /**
             * Gets the store that is used to store values within session scope.
             */
            get: function () {
                return StorageService._session;
            },
            enumerable: true,
            configurable: true
        });
        // #endregion
        // #region Public Static Methods
        /**
         * Gets a store depending on the provided kind.
         * @param {StorageKind} kind The kind of the store, which can be local or session storage.
         * @return {IStore} Returns the requested store.
         */
        StorageService.get = function (kind) {
            if (kind == StorageKind.Page) {
                return StorageService.page;
            }
            else if (kind == StorageKind.Local) {
                return StorageService.local;
            }
            else {
                return StorageService.session;
            }
        };
        /**
         * Configures the storage service with default serializers.
         */
        StorageService.use = function () {
            // Registers default serializers for common types
            StorageSerializer.registerSerializer(new StorageSerializer(DateTime, function (objectToBeSerialized) { return objectToBeSerialized.ticks.toString(); }, function (serializedObject) { return new DateTime(parseInt(serializedObject)); }));
            StorageSerializer.registerSerializer(new StorageSerializer(Numeric, function (objectToBeSerialized) { return objectToBeSerialized.toNumber().toString(); }, function (serializedObject) { return new Numeric(serializedObject.indexOf(".") == -1 ? parseInt(serializedObject) : parseFloat(serializedObject)); }));
            StorageSerializer.registerSerializer(new StorageSerializer(TimeSpan, function (objectToBeSerialized) { return objectToBeSerialized.ticks.toString(); }, function (serializedObject) { return new TimeSpan(parseInt(serializedObject)); }));
        };
        // #region Private Static Fields
        /**
         * Contains the store that is used to store values within page scope.
         */
        StorageService._page = new PageStore();
        /**
         * Contains the store that is used to store values within local scope, which means persistently.
         */
        StorageService._local = new LocalStore();
        /**
         * Contains the store that is used to store values within session scope.
         */
        StorageService._session = new SessionStore();
        return StorageService;
    }());
    return StorageService;
});
