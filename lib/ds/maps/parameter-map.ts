import { Dictionary } from "./dictionary";
import { List } from "../..";

/**
* A Map that stores parameters.
*/
export class ParameterMap extends Dictionary<Parameter> {

  /**
  * Reset all parameters in this map to its default value.
  */
  resetAll():void {
    this._values.forEach(item => item.reset());
  }

  /**
  * Return the value of the parameter associated with this key.
  */
  getValue(key:string):any {
    let param;
    return (param = this.get(key)) && param.value;
  }

  /**
  * Change the value of the parameter associated with this key.
  */
  setValue(key:string, val:any):void {
    let param;
    (param = this.get(key)) && (param.value = val);
  }

  /**
  * Return the string value of the parameter associated with this key.
  */
  getString(key:string):string {
    let param;
    return (param = this.get(key))?param.convert():"";
  }

}

/**
* A data structure used to store information about a value.
* The value provided during initialization is used as the default value.
*/
export class Parameter {
  protected _type: string;
  protected _value: any;
  protected _defaultValue:any
  protected _convert: (value:any, data:any) => string;
  protected _data: any;

  /*
  * Static properties
  */
  static readonly TO_STRING:(value:any) => string = (value) => (value.toString());

  constructor(type:string, value:any)
  constructor(type:string, value:any, convertFn:(value:any, data:any) => string)
  constructor(type:string, value:any, convertFn:(value:any, data:any) => string, data:any)
  constructor(type:string, value:any, convertFn:(value:any, data:any) => string = Parameter.TO_STRING, data:any = {}) {
    this._value = value;
    this._defaultValue = value;
    this._type = type;
    this._convert = convertFn;
    this._data = data;
  }

  /**
  * Return the value of this parameter.
  */
  get value():any {
    return this._value;
  }

  /**
  * Change the value of this parameter.
  */
  set value(value:any) {
      this._value = value;
  }

  /**
  * Return the type of this parameter.
  */
  get type():string {
    return this._type;
  }

  /**
  * Reset the value back to the default value.
  */
  reset():void {
    this._value = this._defaultValue;
  }

  /**
  * Return the data associated with the specified key.
  */
  getData(key:string):any {
    return this._data[key];
  }

  /**
  * Change or add the data associated with the specified key.
  */
  putData(key:string, val:any):void {
    this._data[key] = val;
  }

  /**
  * Return the value of the parameter as a string.
  */
  convert():string {
    return this._convert(this._value, this._data);
  }
}
