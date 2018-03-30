///<amd-module name='durandal-storage-service/StorageKind'/>
define("durandal-storage-service/StorageKind", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Represents the kind of a storage.
     */
    var StorageKind;
    (function (StorageKind) {
        /**
         * The page store, which does not persist data.
         */
        StorageKind[StorageKind["Page"] = 0] = "Page";
        /**
         * The local storage, which persists data.
         */
        StorageKind[StorageKind["Local"] = 1] = "Local";
        /**
         * The session storage, which persists data over a session.
         */
        StorageKind[StorageKind["Session"] = 2] = "Session";
    })(StorageKind || (StorageKind = {}));
    return StorageKind;
});
