"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dictionary_1 = require("./dictionary");
/**
* A Map that stores parameters.
*/
class ParameterMap extends dictionary_1.Dictionary {
    /**
    * Reset all parameters in this map to its default value.
    */
    resetAll() {
        this._values.forEach(item => item.reset());
    }
    /**
    * Returns a pre-built ParameterMap with parameters width, height, fill, stroke, pos-x etc.
    * @example
    *   let rect = ParameterMap.shape();
    */
    static shape() {
        let pMap = new ParameterMap();
        pMap.put("width", new Parameter(Number, 0));
        pMap.put("height", new Parameter(Number, 0));
        pMap.put("fill", new Parameter(String, "#FFFFFF"));
        pMap.put("stroke", new Parameter(String, "#000000"));
        pMap.put("stroke-width", new Parameter(Number, 1));
        pMap.put("stroke-alignment", new Parameter(String, "center"));
        pMap.put("stroke-cap", new Parameter(String, "square"));
        pMap.put("stroke-corner", new Parameter(String, "square"));
        pMap.put("pos-x", new Parameter(Number, 0));
        pMap.put("pos-y", new Parameter(Number, 0));
        return pMap;
    }
}
exports.ParameterMap = ParameterMap;
/**
* A data structure used to store information about a value.
* The value provided during initialization is used as the default value.
*/
class Parameter {
    constructor(type, value, convertFn = Parameter.TO_STRING, data = {}) {
        if (value.constructor === type) {
            this._value = value;
            this._defaultValue = value;
        }
        else {
            throw new Error(`Parameter type mismatch. The value ${value} is not of type ${type}`);
        }
        this._type = type;
        this._convert = convertFn;
        this._data = data;
    }
    /**
    * Return the value of this parameter.
    */
    get value() {
        return this._value;
    }
    /**
    * Change the value of this parameter.
    */
    set value(value) {
        if (value.constructor === this._type) {
            this._value = value;
        }
        else {
            throw new Error(`Parameter type mismatch. The value ${value} is not of type ${this._type}`);
        }
    }
    /**
    * Return the type of this parameter.
    */
    get type() {
        return this._type;
    }
    /**
    * Reset the value back to the default value.
    */
    reset() {
        this._value = this._defaultValue;
    }
    /**
    * Return the data associated with the specified key.
    */
    getData(key) {
        return this._data[key];
    }
    /**
    * Change or add the data associated with the specified key.
    */
    putData(key, val) {
        this._data[key] = val;
    }
    /**
    * Return the value of the parameter as a string.
    */
    convert() {
        return this._convert(this._value, this._data);
    }
}
/*
* Static properties
*/
Parameter.TO_STRING = (value) => (value.toString());
exports.Parameter = Parameter;
