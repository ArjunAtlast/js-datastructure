import { Matrix, MatrixRow, MatrixColumn } from "../../interfaces/matrix";
import { Cloneable } from "../../interfaces/cloneable";
/**
* A 2 dimensional array implementation of Matrix.
*/
export declare class ArrayMatrix<E> implements Matrix<E>, Cloneable<ArrayMatrix<E>> {
    protected _store: E[][];
    constructor(height: number, width: number);
    constructor(height: number, width: number, defaultValue: E);
    /**
    * Read the item at the specified position in this matrix.
    * @example
    *   //  [1 2 3]
    *   //  [2 3 4]
    *   //  [3 4 5]
    *   matrix.get(1,1); //3
    */
    get(rowIndex: number, columnIndex: number): E;
    /**
    * Insert an item at the specified position in this matrix.
    * @example
    *   //  [1 2 3]
    *   //  [2 3 4]
    *   //  [3 4 5]
    *   matrix.put(0,1,5);
    *   //  [1 2 3]
    *   //  [5 3 4]
    *   //  [3 4 5]
    */
    put(rowIndex: number, columnIndex: number, item: E): void;
    /**
    * Returns the transpose of this matrix.
    * @example
    *   //  [1 2 3]
    *   //  [4 5 6]
    *   //  [7 8 9]
    *   matrix.transpose();
    *   //  [1 4 7]
    *   //  [2 5 8]
    *   //  [3 6 9]
    */
    transpose(): this;
    /**
    * Returns the number of rows in this matrix.
    * @example
    *   matrix.height(); //return 3
    */
    height(): number;
    /**
    * Returns the number of columns in this matrix.
    * @example
    *   matrix.width(); //return 3
    */
    width(): number;
    /**
    * Returns the submatrix obtained after removing the specified rows and columns from this matrix.
    * @example
    *   //  [1 2 3]
    *   //  [4 5 6]
    *   //  [7 8 9]
    *   matrix.subMatrix([0],[1])
    *   //  [4 6]
    *   //  [7 9]
    */
    subMatrix(rows: number[], cols: number[]): this;
    /**
    * Returns the row correponding to the specified index.
    * @example
    *   //  [1 2 3]
    *   //  [4 5 6]
    *   //  [7 8 9]
    *   matrix.row(1); //[4,5,6]
    */
    row(index: number): ArrayMatrixRow<E>;
    /**
    * Returns the column correponding to the specified index.
    * @example
    *   //  [1 2 3]
    *   //  [4 5 6]
    *   //  [7 8 9]
    *   matrix.col(1); //[2,5,8]
    */
    col(index: number): ArrayMatrixColumn<E>;
    /**
    * Check whether the specified matrix is equal to this matrix.
    * @example
    *   //  m1:
    *   //  [1 2]
    *   //  [2 3]
    *   //  m2:
    *   //  [1 2]
    *   //  [2 3]
    *   m1.equals(m2); //returns true
    */
    equals(matrix: ArrayMatrix<E>): boolean;
    /**
    * Return a 2 dimensional array corresponding to the matrix.
    * @example
    *   //  [1 2 3]
    *   //  [4 5 6]
    *   //  [7 8 9]
    *   matrix.toArray(); //[[1,2,3],[4,5,6],[7,8,9]]
    */
    toArray(): E[][];
    /**
    * Create a copy of the current object and return
    * @example
    *   matrix.clone();
    */
    clone(): this;
}
/**
* A single row of an ArrayMatrix.
*/
export declare class ArrayMatrixRow<E> implements MatrixRow<E> {
    protected _matrix: ArrayMatrix<E>;
    protected _index: number;
    constructor(matrix: ArrayMatrix<E>, index: number);
    /**
    * Return the matrix to which this row belong.
    */
    readonly matrix: ArrayMatrix<E>;
    /**
    * Return the index of this row in the matrix it belongs to.
    */
    readonly index: number;
    /**
    * Change this matrix row with another row of same matrix.
    * @example
    *   //am:ArrayMatrix
    *   let r1 = am.row(0);
    *   let r2 = am.row(1);
    *   r1.change(r2);  // corresponds to R1 -> R2
    */
    change<R extends ArrayMatrixRow<E>>(row: R): void;
    /**
    * Interchange this row with another row of the same matrix.
    * @example
    *   //am:ArrayMatrix
    *   let r1 = am.row(0);
    *   let r2 = am.row(1);
    *   r1.interchange(r2);  // corresponds to R1 <-> R2
    */
    interchange<R extends ArrayMatrixRow<E>>(row: R): void;
    /**
    * Return an array corresponding to this row.
    * @example
    *   //am:ArrayMatrix
    *   //  [1 0 0]
    *   //  [0 1 0]
    *   //  [0 0 1]
    *   am.row(1).toArray() // [0,1,0]
    */
    toArray(): E[];
}
/**
* A single column of an ArrayMatrix.
*/
export declare class ArrayMatrixColumn<E> implements MatrixColumn<E> {
    protected _matrix: ArrayMatrix<E>;
    protected _index: number;
    constructor(matrix: ArrayMatrix<E>, index: number);
    /**
    * Return the matrix to which this column belong.
    */
    readonly matrix: ArrayMatrix<E>;
    /**
    * Return the index of this colun in the matrix it belongs to.
    */
    readonly index: number;
    /**
    * Change this matrix column with another column of same matrix.
    * @example
    *   //am:ArrayMatrix
    *   let c1 = am.col(0);
    *   let c2 = am.col(1);
    *   c1.change(c2);  // corresponds to C1 -> C2
    */
    change<C extends ArrayMatrixColumn<E>>(col: C): void;
    /**
    * Interchange this column with another column of the same matrix.
    * @example
    *   //am:ArrayMatrix
    *   let c1 = am.col(0);
    *   let c2 = am.col(1);
    *   c1.interchange(c2);  // corresponds to C1 <-> C2
    */
    interchange<C extends ArrayMatrixColumn<E>>(col: C): void;
    /**
    * Return an array corresponding to this column.
    * @example
    *   //am:ArrayMatrix
    *   //  [1 1 1]
    *   //  [0 1 1]
    *   //  [0 0 1]
    *   am.col(1).toArray() // [1,1,0]
    */
    toArray(): E[];
}
