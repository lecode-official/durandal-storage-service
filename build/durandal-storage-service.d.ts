declare module 'durandal-storage-service/IStore' {
	/**
	 * Represents a store that stores values.
	 */
	interface IStore {
	    /**
	     * Gets a value that has been stored to the given key. If the key is not found, null is returned.
	     * @param {string} key The key at which the value has been stored.
	     * @return {T|null} Returns the value at the given key.
	     */
	    get<T>(key: string): T | null;
	    /**
	     * Stores the given value at the specified key. If null is provided as value, the entry is removed from the store.
	     * @param {string} key The key at which the value should be stored.
	     * @param {T|null} value The value that should be stored.
	     */
	    store<T>(key: string, value: T | null): void;
	}
	export = IStore;

}
declare module 'durandal-storage-service/LocalStore' {
	import IStore = require("durandal-storage-service/IStore"); class LocalStore implements IStore {
	    /**
	     * Gets a value that has been stored to the given key. If the key is not found, null is returned.
	     * @param {string} key The key at which the value has been stored.
	     * @return {T|null} Returns the value at the given key.
	     */
	    get<T>(key: string): T | null;
	    /**
	     * Stores the given value at the specified key. If null is provided as value, the entry is removed from the store.
	     * @param {string} key The key at which the value should be stored.
	     * @param {T|null} value The value that should be stored.
	     */
	    store<T>(key: string, value: T | null): void;
	}
	export = LocalStore;

}
declare module 'durandal-storage-service/PageStore' {
	import IStore = require("durandal-storage-service/IStore"); class PageStore implements IStore {
	    /**
	     * Contains the dictionary that stores the values
	     */
	    private pageStore;
	    /**
	     * Gets a value that has been stored to the given key. If the key is not found, null is returned.
	     * @param {string} key The key at which the value has been stored.
	     * @return {T|null} Returns the value at the given key.
	     */
	    get<T>(key: string): T | null;
	    /**
	     * Stores the given value at the specified key. If null is provided as value, the entry is removed from the store.
	     * @param {string} key The key at which the value should be stored.
	     * @param {T|null} value The value that should be stored.
	     */
	    store<T>(key: string, value: T | null): void;
	}
	export = PageStore;

}
declare module 'durandal-storage-service/SessionStore' {
	import IStore = require("durandal-storage-service/IStore"); class SessionStore implements IStore {
	    /**
	     * Gets a value that has been stored to the given key. If the key is not found, null is returned.
	     * @param {string} key The key at which the value has been stored.
	     * @return {T|null} Returns the value at the given key.
	     */
	    get<T>(key: string): T | null;
	    /**
	     * Stores the given value at the specified key. If null is provided as value, the entry is removed from the store.
	     * @param {string} key The key at which the value should be stored.
	     * @param {T|null} value The value that should be stored.
	     */
	    store<T>(key: string, value: T | null): void;
	}
	export = SessionStore;

}
declare module 'durandal-storage-service/StorageKind' {
	 enum StorageKind {
	    /**
	     * The page store, which does not persist data.
	     */
	    Page = 0,
	    /**
	     * The local storage, which persists data.
	     */
	    Local = 1,
	    /**
	     * The session storage, which persists data over a session.
	     */
	    Session = 2,
	}
	export = StorageKind;

}
declare module 'durandal-storage-service/StorageSerializer' {
	 class StorageSerializer {
	    /**
	     * Initializes a new StorageSerializer instance.
	     * @param {string} type The type that the serializer can handle.
	     * @param {(objectToSerialize: any) => string} serialize The serialization function.
	     * @param {(serializedObject: string) => any} deserialize The deserialization function.
	     */
	    constructor(type: any, serialize: (objectToSerialize: any) => string, deserialize: (serializedObject: string) => any);
	    /**
	     * Contains all serializers that have been registered.
	     */
	    private static serializers;
	    /**
	     * Gets or sets the type that the serializer can handle.
	     */
	    type: any;
	    /**
	     * Gets or sets the serialization function.
	     */
	    serialize: (objectToSerialize: any) => string;
	    /**
	     * Gets or sets the deserialization function.
	     */
	    deserialize: (serializedObject: string) => any;
	    /**
	     * Serializes the given object and returns its serialized representation.
	     * @param {any} objectToBeSerialized The object that is to be serialized.
	     * @return {{ type: string; data: string }} Returns the serialized representation of the object.
	     */
	    static serialize(objectToBeSerialized: any): {
	        type: string;
	        data: string;
	    };
	    /**
	     * Deserializes the given string and return its deserialized object.
	     * @param {{ type: string; data: string }} serializedObject The object that contains the string that is to be deserialized.
	     * @return {any} Returns the deserialized object.
	     */
	    static deserialize(serializedObject: {
	        type: string;
	        data: string;
	    }): any;
	    /**
	     * Registers a new serializer to the global list of serializers.
	     * @param {StorageSerializer} serializer The serializer that is to be registered.
	     */
	    static registerSerializer(serializer: StorageSerializer): void;
	}
	export = StorageSerializer;

}
declare module 'durandal-storage-service/StorageService' {
	import LocalStore = require("durandal-storage-service/LocalStore");
	import PageStore = require("durandal-storage-service/PageStore");
	import SessionStore = require("durandal-storage-service/SessionStore");
	import IStore = require("durandal-storage-service/IStore");
	import StorageKind = require("durandal-storage-service/StorageKind"); class StorageService {
	    /**
	     * Contains the store that is used to store values within page scope.
	     */
	    private static _page;
	    /**
	     * Contains the store that is used to store values within local scope, which means persistently.
	     */
	    private static _local;
	    /**
	     * Contains the store that is used to store values within session scope.
	     */
	    private static _session;
	    /**
	     * Gets the store that is used to store values within page scope.
	     */
	    static readonly page: PageStore;
	    /**
	     * Gets the store that is used to store values within local scope, which means persistently.
	     */
	    static readonly local: LocalStore;
	    /**
	     * Gets the store that is used to store values within session scope.
	     */
	    static readonly session: SessionStore;
	    /**
	     * Gets a store depending on the provided kind.
	     * @param {StorageKind} kind The kind of the store, which can be local or session storage.
	     * @return {IStore} Returns the requested store.
	     */
	    static get(kind: StorageKind): IStore;
	    /**
	     * Configures the storage service with default serializers.
	     */
	    static use(): void;
	}
	export = StorageService;

}
