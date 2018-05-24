export interface Matrix<E> {
    /**
    * Read the item at the specified position in this matrix.
    */
    get(rowIndex: number, columnIndex: number): E | undefined;
    /**
    * Insert an item at the specified position in this matrix.
    */
    put(rowIndex: number, columnIndex: number, item: E): void;
    /**
    * Returns the transpose of this matrix.
    */
    transpose(): Matrix<E>;
    /**
    * Returns the number of rows in this matrix.
    */
    height(): number;
    /**
    * Returns the number of columns in this matrix.
    */
    width(): number;
    /**
    * Returns the submatrix obtained after removing the specified rows and columns from this matrix.
    */
    subMatrix(rows: number[], cols: number[]): Matrix<E>;
    /**
    * Check whether the specified matrix is equal to this matrix.
    */
    equals(matrix: Matrix<E>): boolean;
}
/**
* A single row of a matrix.
*/
export interface MatrixRow<E> {
    /**
    * Change this matrix row with another row of same matrix.
    */
    change(row: MatrixRow<E>): void;
    /**
    * Interchange this row with another row of the same matrix.
    */
    interchange(row: MatrixRow<E>): void;
}
/**
* A single column of a matrix.
*/
export interface MatrixColumn<E> {
    /**
    * Change this matrix column with another column of same matrix.
    */
    change(col: MatrixColumn<E>): void;
    /**
    * Interchange this column with another column of the same matrix.
    */
    interchange(col: MatrixColumn<E>): void;
}
