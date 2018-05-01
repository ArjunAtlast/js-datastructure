/** Classes that implements this interface must have a clone method.*/
export interface Cloneable<T> {
  /**
    create a copy of the current object and return
  */
  clone():T;
}
