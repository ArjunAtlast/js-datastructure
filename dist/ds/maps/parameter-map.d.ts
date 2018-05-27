import { Dictionary } from "./dictionary";
/**
* A Map that stores parameters.
*/
export declare class ParameterMap extends Dictionary<Parameter> {
    /**
    * Reset all parameters in this map to its default value.
    */
    resetAll(): void;
    /**
    * Returns a pre-built ParameterMap with parameters width, height, fill, stroke, pos-x etc.
    * @example
    *   let rect = ParameterMap.shape();
    */
    static shape(): ParameterMap;
}
/**
* A data structure used to store information about a value.
* The value provided during initialization is used as the default value.
*/
export declare class Parameter {
    protected _type: new (...args: any[]) => any;
    protected _value: any;
    protected _defaultValue: any;
    protected _convert: (value: any, data: any) => string;
    protected _data: any;
    static readonly TO_STRING: (value: any) => string;
    constructor(type: new (...args: any[]) => any, value: any);
    constructor(type: new (...args: any[]) => any, value: any, convertFn: (value: any, data: any) => string);
    constructor(type: new (...args: any[]) => any, value: any, convertFn: (value: any, data: any) => string, data: any);
    /**
    * Return the value of this parameter.
    */
    /**
    * Change the value of this parameter.
    */
    value: any;
    /**
    * Return the type of this parameter.
    */
    readonly type: new (...args: any[]) => any;
    /**
    * Reset the value back to the default value.
    */
    reset(): void;
    /**
    * Return the data associated with the specified key.
    */
    getData(key: string): any;
    /**
    * Change or add the data associated with the specified key.
    */
    putData(key: string, val: any): void;
    /**
    * Return the value of the parameter as a string.
    */
    convert(): string;
}
