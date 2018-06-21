import { NumberMatrix } from "./number-matrix";
/**
* A NumberMatrix with equal number of rows and columns.
*/
export declare class SquareMatrix extends NumberMatrix {
    constructor(order: number);
    constructor(order: number, defaultValue: number);
    /**
    * Returns identity matrix of the given order.
    * @example
    *   let m1 = SquareMatrix.identity(3);
    *   //  m1:
    *   //  [1 0 0]
    *   //  [0 1 0]
    *   //  [0 0 1]
    */
    static identity(order: number): SquareMatrix;
    /**
    * Create a square matrix from the number matrix of same height and width.
    */
    static cast(matrix: NumberMatrix): SquareMatrix;
    /**
    * Returns the order of the matrix.
    */
    order(): number;
    /**
    * Check whether this matrix is symmetric or not.
    */
    isSymmetric(): boolean;
    /**
    * Check whether this matrix is skew-symmetric or not.
    */
    isSkewSymmetric(): boolean;
    /**
    * Returns the minor of the element specified by the indices.
    */
    minor(rowIndex: number, columnIndex: number): number;
    /**
    * Returns the cofactor of the element specified by the indices.
    */
    cofactor(rowIndex: number, columnIndex: number): number;
    /**
    * Returns the determinant of the square matrix.
    */
    determinant(): number;
    /**
    * Returns the matrix of minors of this matrix.
    */
    minorMatrix(): this;
    /**
    * Returns the matrix of cofactors of this matrix.
    */
    cofactorMatrix(): this;
    /**
    * Returns the adjoint of this matrix.
    */
    adjoint(): this;
    /**
    * Return the inverse of this matrix if any. If not it returns null.
    */
    inverse(): this | null;
    /**
    * Returns the trace of this square matrix. (Trace is the sum of diagonal values of a square matrix.)
    */
    trace(): number;
}
