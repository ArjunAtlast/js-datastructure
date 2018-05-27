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
  * Returns a pre-built ParameterMap with parameters width, height, fill, stroke, pos-x etc.
  * @example
  *   let rect = ParameterMap.shape();
  */
  static shape():ParameterMap {
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

/**
* A data structure used to store information about a value.
* The value provided during initialization is used as the default value.
*/
export class Parameter {
  protected _type: new (...args:any[]) => any;
  protected _value: any;
  protected _defaultValue:any
  protected _convert: (value:any, data:any) => string;
  protected _data: any;

  /*
  * Static properties
  */
  static readonly TO_STRING:(value:any) => string = (value) => (value.toString());

  constructor(type:new (...args:any[]) => any, value:any)
  constructor(type:new (...args:any[]) => any, value:any, convertFn:(value:any, data:any) => string)
  constructor(type:new (...args:any[]) => any, value:any, convertFn:(value:any, data:any) => string, data:any)
  constructor(type:new (...args:any[]) => any, value:any, convertFn:(value:any, data:any) => string = Parameter.TO_STRING, data:any = {}) {
    if(value.constructor === type) {
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
  get value():any {
    return this._value;
  }

  /**
  * Change the value of this parameter.
  */
  set value(value:any) {
    if(value.constructor === this._type) {
      this._value = value;
    }
    else {
      throw new Error(`Parameter type mismatch. The value ${value} is not of type ${this._type}`);
    }
  }

  /**
  * Return the type of this parameter.
  */
  get type():new (...args:any[]) => any {
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
