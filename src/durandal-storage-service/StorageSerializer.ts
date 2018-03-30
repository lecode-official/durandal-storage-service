
///<amd-module name='durandal-storage-service/StorageSerializer'/>

/**
 * Represents a serializer that can be registered at the storage service in order to be able to serialize and deserialize a specific type.
 */
class StorageSerializer {

    // #region Constructors

    /**
     * Initializes a new StorageSerializer instance.
     * @param {string} type The type that the serializer can handle. 
     * @param {(objectToSerialize: any) => string} serialize The serialization function.
     * @param {(serializedObject: string) => any} deserialize The deserialization function.
     */
    constructor(type: any, serialize: (objectToSerialize: any) => string, deserialize: (serializedObject: string) => any) {
        this.type = type;
        this.serialize = serialize;
        this.deserialize = deserialize;
    }

    // #endregion

    // #region Private Static Fields

    /**
     * Contains all serializers that have been registered.
     */
    private static serializers: StorageSerializer[] = [];

    // #endregion

    // #region Public Properties

    /**
     * Gets or sets the type that the serializer can handle.
     */
    public type: any;

    /**
     * Gets or sets the serialization function.
     */
    public serialize: (objectToSerialize: any) => string;

    /**
     * Gets or sets the deserialization function.
     */
    public deserialize: (serializedObject: string) => any;

    // #endregion

    // #region Public Static Methods
    
    /**
     * Serializes the given object and returns its serialized representation.
     * @param {any} objectToBeSerialized The object that is to be serialized.
     * @return {{ type: string; data: string }} Returns the serialized representation of the object. 
     */
    public static serialize(objectToBeSerialized: any): { type: string; data: string } {

        // Checks whether the object is a string
        if (typeof objectToBeSerialized === "string") {
            return { type: "string", data: objectToBeSerialized };
        }
        
        // Checks whether the object is a number
        if (typeof objectToBeSerialized === "number") {
            return { type: "number", data: (<number> objectToBeSerialized).toString() };
        }

        // Checks whether the object is a boolean
        if (typeof objectToBeSerialized === "boolean") {
            return { type: "boolean", data: (<boolean> objectToBeSerialized).toString() };
        }

        // Checks whether any serializer for the type has been provided
        var serializers = StorageSerializer.serializers.filter(serializer => objectToBeSerialized instanceof serializer.type);
        if (serializers.length > 0) {
            return { type: serializers[0].type.name, data: serializers[0].serialize(objectToBeSerialized) };
        }

        // Serializes the object via JSON
        return { type: "JSON", data: JSON.stringify(objectToBeSerialized) };
    }

    /**
     * Deserializes the given string and return its deserialized object.
     * @param {{ type: string; data: string }} serializedObject The object that contains the string that is to be deserialized.
     * @return {any} Returns the deserialized object. 
     */
    public static deserialize(serializedObject: { type: string; data: string }): any {

        // Checks whether the object is a string
        if (serializedObject.type === "string") {
            return serializedObject.data;
        }
        
        // Checks whether the object is a number
        if (serializedObject.type === "number") {
            return serializedObject.data.indexOf(".") == -1 ? parseInt(serializedObject.data) : parseFloat(serializedObject.data);
        }

        // Checks whether the object is a boolean
        if (serializedObject.type === "boolean") {
            return serializedObject.data.toUpperCase() === "TRUE" ? true : false;
        }

        // Checks whether any serializer for the type has been provided
        var serializers = StorageSerializer.serializers.filter(serializer => serializedObject.type === serializer.type.name);
        if (serializers.length > 0) {
            return serializers[0].deserialize(serializedObject.data);
        }

        // Deserialized the string via JSON
        return JSON.parse(serializedObject.data);
    }  

    /**
     * Registers a new serializer to the global list of serializers.
     * @param {StorageSerializer} serializer The serializer that is to be registered.
     */
    public static registerSerializer(serializer: StorageSerializer) {

        // Adds the serializer to the global list
        StorageSerializer.serializers.push(serializer);
    }  

    // #endregion

}

// Exports the module, so that it can be loaded by Require
export = StorageSerializer;