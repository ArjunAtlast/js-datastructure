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
    * Return the value of the parameter associated with this key.
    */
    getValue(key) {
        let param;
        return (param = this.get(key)) && param.value;
    }
    /**
    * Change the value of the parameter associated with this key.
    */
    setValue(key, val) {
        let param;
        (param = this.get(key)) && (param.value = val);
    }
    /**
    * Return the string value of the parameter associated with this key.
    */
    getString(key) {
        let param;
        return (param = this.get(key)) ? param.convert() : "";
    }
}
exports.ParameterMap = ParameterMap;
/**
* A data structure used to store information about a value.
* The value provided during initialization is used as the default value.
*/
class Parameter {
    constructor(type, value, convertFn = Parameter.TO_STRING, data = {}) {
        this._value = value;
        this._defaultValue = value;
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
        this._value = value;
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
