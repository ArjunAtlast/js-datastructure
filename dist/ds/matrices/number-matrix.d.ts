import { ArrayMatrix, ArrayMatrixRow, ArrayMatrixColumn } from "./array-matrix";
/**
* An Array Matrix with only number values. Matrix element has a default value of 0.
*/
export declare class NumberMatrix extends ArrayMatrix<number> {
    constructor(height: number, width: number);
    constructor(height: number, width: number, defaultValue: number);
    /**
    * Returns a zero matrix of given order.
    * @example
    *   let zeroMatrix = NumberMatrix.zero(2,3)
    *   //   [0 0 0]
    *   //   [0 0 0]
    */
    static zero(height: number, width: number): NumberMatrix;
    /**
    * Returns an all-ones matrix of given order.
    * @example
    *   let allOneMatrix = NumberMatrix.allOnes(2,3)
    *   //   [1 1 1]
    *   //   [1 1 1]
    */
    static allOnes(height: number, width: number): NumberMatrix;
    /**
    * Generate a matrix based on the given order and generateFn function on the indices.
    * @example
    *   let m = NumberMatrix.generate(3,3,(i,j)=>(i+j));
    *   //  [0 1 2]
    *   //  [1 2 3]
    *   //  [2 3 4]
    */
    static generate(height: number, width: number, generateFn: (rowIndex: number, columnIndex: number) => number): NumberMatrix;
    /**
    * Multiply two matrices and return the resultant matrix.
    * @example
    *   //  m1:
    *   //  [1 2 3]
    *   //  [2 3 4]
    *   //  m2:
    *   //  [1 1]
    *   //  [2 2]
    *   //  [3 3]
    *   NumberMatrix.multiply(m1,m2)
    *   //  [14 14]
    *   //  [20 20]
    */
    static multiply(a: NumberMatrix, b: NumberMatrix): NumberMatrix;
    /**
    * Create a matrix from the specified two dimensional array.
    * @example
    *   NumberMatrix.fromArray([[1,2],[3,4]]);
    *   //  [1 2]
    *   //  [3 4]
    */
    static fromArray(array: number[][]): NumberMatrix;
    /**
    * Add to each element in this matrix the corresponding elements in the specified matrix.
    * @example
    *   //  m1:
    *   //  [1 2]
    *   //  [2 3]
    *   //  m2:
    *   //  [3 2]
    *   //  [4 3]
    *   m1.add(m2);
    *   //  [4 4]
    *   //  [6 6]
    */
    add(matrix: NumberMatrix): this;
    /**
    * Subtract from each element in this matrix, the corresponding elements in the specified matrix.
    * @example
    *   m1.subtract(m2);
    *   //  [-2 0]
    *   //  [-2 0]
    */
    subtract(matrix: NumberMatrix): this;
    /**
    * Multiply each element in this matrix with the specified scalar.
    * @example
    *   m1.multiply(2);
    *   //  [2 4]
    *   //  [4 6]
    */
    scalarMultiply(scalar: number): this;
    /**
    * Returns the row correponding to the specified index.
    * @example
    *   m1.row(0);  //  [1,2]
    */
    row(index: number): NumberMatrixRow;
    /**
    * Returns the column correponding to the specified index.
    * @example
    *   m1.col(1);  //  [2,3]
    */
    col(index: number): NumberMatrixColumn;
}
/**
* A single row of a NumberMatrix.
* Is obtained by calling row() method of a NumberMatrix instance.
*/
export declare class NumberMatrixRow extends ArrayMatrixRow<number> {
    protected _matrix: NumberMatrix;
    constructor(matrix: NumberMatrix, index: number);
    /**
    * Return the matrix to which this row belong.
    */
    readonly matrix: NumberMatrix;
    /**
    * Add to this row another row of the same matix.
    * @example
    *   //nm:NumberMatrix.
    *   let r1 = nm.row(0);
    *   let r2 = nm.row(1);
    *   r1.add(r2); // R1 -> R1 + R2
    */
    add<R extends NumberMatrixRow>(row: R): void;
    /**
    * Add to this row a multiple of a row of the same matix.
    * @example
    *   //nm:NumberMatrix.
    *   let r1 = nm.row(0);
    *   let r2 = nm.row(1);
    *   r1.add(r2, 3); // R1 -> R1 + 3R2
    */
    add<R extends NumberMatrixRow>(row: R, coeff: number): void;
    /**
    * Multiply all entries of a row by a non-zero scalar.
    * @example
    *   //nm:NumberMatrix.
    *   let r1 = nm.row(0);
    *   r1.multiply(5); // R1 -> 5.R1
    */
    multiply(scalar: number): void;
}
/**
* A single column of a NumberMatrix.
* Is obtained by calling col() method of a NumberMatrix instance.
*/
export declare class NumberMatrixColumn extends ArrayMatrixColumn<number> {
    protected _matrix: NumberMatrix;
    constructor(matrix: NumberMatrix, index: number);
    /**
    * Return the matrix to which this column belong.
    */
    readonly matrix: NumberMatrix;
    /**
    * Add to this column another column of the same matix.
    * @example
    *   //nm:NumberMatrix.
    *   let c1 = nm.col(0);
    *   let c2 = nm.col(1);
    *   c1.add(c2); // C1 -> C1 + C2
    */
    add<C extends NumberMatrixColumn>(col: C): void;
    /**
    * Add to this column a multiple of a column of the same matix.
    * @example
    *   c1.add(c2, 3); // C1 -> C1 + 3C2
    */
    add<C extends NumberMatrixColumn>(col: C, coeff: number): void;
    /**
    * Multiply all entries of a column by a non-zero scalar.
    * @example
    *   //nm:NumberMatrix.
    *   let c1 = nm.col(0);
    *   c1.multiply(5); // C1 -> 5.C1
    */
    multiply(scalar: number): void;
}
