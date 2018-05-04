/**
  Implementing this interface means that the class overrides Object's toString method to return the object's JSON String
*/
export interface Serializable {
    /**
      Return this object's corresponding JSON String
    */
    toString(): string;
    /**
    * Return the Object from the JSON string
    */
    fromString(json: string, deserializerFn: (itemJSON: string) => any): Object;
}
