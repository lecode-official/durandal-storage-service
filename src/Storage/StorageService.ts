
///<amd-module name='Storage/StorageService'/>

// #region Import Directives

/// <reference path="../Typings/References.d.ts" />

import DateTime = require("Globalization/DateTime");
import LocalStore = require("Storage/LocalStore");
import Numeric = require("Globalization/Numeric");
import PageStore = require("Storage/PageStore");
import SessionStore = require("Storage/SessionStore");
import IStore = require("Storage/IStore");
import StorageKind = require("Storage/StorageKind");
import StorageSerializer = require("Storage/StorageSerializer");
import TimeSpan = require("Globalization/TimeSpan");

// #endregion

/**
 * Represents a service that is used to store values in a persistent store.
 */
class StorageService {

    // #region Private Static Fields

    /**
     * Contains the store that is used to store values within page scope.
     */
    private static _page: PageStore = new PageStore();

    /**
     * Contains the store that is used to store values within local scope, which means persistently.
     */
    private static _local: LocalStore = new LocalStore();

    /**
     * Contains the store that is used to store values within session scope.
     */
    private static _session: SessionStore = new SessionStore();
    
    // #endregion

    // #region Public Static Properties
    
    /**
     * Gets the store that is used to store values within page scope.
     */
    public static get page(): PageStore {
        return StorageService._page;
    }

    /**
     * Gets the store that is used to store values within local scope, which means persistently.
     */
    public static get local(): LocalStore {
        return StorageService._local;
    }
    
    /**
     * Gets the store that is used to store values within session scope.
     */
    public static get session(): SessionStore {
        return StorageService._session;
    }

    // #endregion

    // #region Public Static Methods

    /**
     * Gets a store depending on the provided kind.
     * @param {StorageKind} kind The kind of the store, which can be local or session storage.
     * @return {IStore} Returns the requested store.
     */
    public static get(kind: StorageKind): IStore {
        if (kind == StorageKind.Page) {
            return StorageService.page;
        } else if (kind == StorageKind.Local) {
            return StorageService.local;
        } else {
            return StorageService.session;
        }
    }

    /**
     * Configures the storage service with default serializers.
     */
    public static use() {

        // Registers default serializers for common types
        StorageSerializer.registerSerializer(new StorageSerializer(DateTime, objectToBeSerialized => (<DateTime>objectToBeSerialized).ticks.toString(), serializedObject => new DateTime(parseInt(serializedObject))));
        StorageSerializer.registerSerializer(new StorageSerializer(Numeric, objectToBeSerialized => (<Numeric>objectToBeSerialized).toNumber().toString(), serializedObject => new Numeric(serializedObject.indexOf(".") == -1 ? parseInt(serializedObject) : parseFloat(serializedObject))));
        StorageSerializer.registerSerializer(new StorageSerializer(TimeSpan, objectToBeSerialized => (<TimeSpan>objectToBeSerialized).ticks.toString(), serializedObject => new TimeSpan(parseInt(serializedObject))));
    }

    // #endregion

}

// Exports the module, so that it can be loaded by Require
export = StorageService;