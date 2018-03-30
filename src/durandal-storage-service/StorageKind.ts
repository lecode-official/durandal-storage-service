
///<amd-module name='durandal-storage-service/StorageKind'/>

/**
 * Represents the kind of a storage.
 */
enum StorageKind {

    /**
     * The page store, which does not persist data.
     */
    Page,

    /**
     * The local storage, which persists data.
     */
    Local,

    /**
     * The session storage, which persists data over a session.
     */
    Session

}

// Exports the module, so that it can be loaded by Require
export = StorageKind;