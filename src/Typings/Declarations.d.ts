
/**
 * Represents the interface of the store2 area.
 */
interface Store2Area {
    has(key: string): boolean;
    get(key: string): any;
    set(key: string, data: any): void;
    remove(key: string): any;
}

/**
 * Represents the interface of the static store2 module.
 */
interface Store2Static {
    session: Store2Area;
    local: Store2Area;
}

/**
 * Declares the static variable of the store2 module.
 */
declare var store2: Store2Static;

/**
 * Declares the store2 module.
 */
declare module "store2" {
    export = store2;
}
