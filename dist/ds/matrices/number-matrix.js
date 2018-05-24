"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_matrix_1 = require("./array-matrix");
/**
* An Array Matrix with only number values. Matrix element has a default value of 0.
*/
class NumberMatrix extends array_matrix_1.ArrayMatrix {
    constructor(height, width, defaultValue = 0) {
        super(height, width, defaultValue);
    }
    /**
    * Returns a zero matrix of given order.
    * @example
    *   let zeroMatrix = NumberMatrix.zero(2,3)
    *   //   [0 0 0]
    *   //   [0 0 0]
    */
    static zero(height, width) {
        return new NumberMatrix(height, width, 0);
    }
    /**
    * Returns an all-ones matrix of given order.
    * @example
    *   let allOneMatrix = NumberMatrix.allOnes(2,3)
    *   //   [1 1 1]
    *   //   [1 1 1]
    */
    static allOnes(height, width) {
        return new NumberMatrix(height, width, 1);
    }
    /**
    * Generate a matrix based on the given order and generateFn function on the indices.
    * @example
    *   let m = NumberMatrix.generate(3,3,(i,j)=>(i+j));
    *   //  [0 1 2]
    *   //  [1 2 3]
    *   //  [2 3 4]
    */
    static generate(height, width, generateFn) {
        let mat = new NumberMatrix(height, width);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++)
                mat.put(i, j, generateFn(i, j));
        }
        return mat;
    }
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
    static multiply(a, b) {
        if (a.width() != b.height()) {
            throw new Error("Trying to multiply two incompatable matrices.");
        }
        let n = a.height(), m = a.width(), p = b.width();
        let c = new NumberMatrix(n, p);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < p; j++) {
                let sum = 0;
                for (let k = 0; k < m; k++) {
                    sum = sum + parseFloat((a.get(i, k) * b.get(k, j)).toFixed(15));
                }
                c.put(i, j, sum);
            }
        }
        return c;
    }
    /**
    * Create a matrix from the specified two dimensional array.
    * @example
    *   NumberMatrix.fromArray([[1,2],[3,4]]);
    *   //  [1 2]
    *   //  [3 4]
    */
    static fromArray(array) {
        let h = array.length, w = array[0].length;
        let nm = new NumberMatrix(h, w);
        for (let i = 0; i < h; i++)
            for (let j = 0; j < w; j++)
                nm.put(i, j, array[i][j]);
        return nm;
    }
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
    add(matrix) {
        if (matrix.height() !== this.height() || matrix.width() !== this.width()) {
            throw new Error(`The matrix ${matrix} cannot be added with the matrix ${this}. The two matrices have different order.`);
        }
        else {
            for (let i = 0; i < this.height(); i++)
                for (let j = 0; j < this.width(); j++)
                    this._store[i][j] += matrix.get(i, j);
            return this;
        }
    }
    /**
    * Subtract from each element in this matrix, the corresponding elements in the specified matrix.
    * @example
    *   m1.subtract(m2);
    *   //  [-2 0]
    *   //  [-2 0]
    */
    subtract(matrix) {
        if (matrix.height() !== this.height() || matrix.width() !== this.width()) {
            throw new Error(`The matrix ${matrix} cannot be subtracted from the matrix ${this}. The two matrices have different order.`);
        }
        else {
            for (let i = 0; i < this.height(); i++)
                for (let j = 0; j < this.width(); j++)
                    this._store[i][j] -= matrix.get(i, j);
            return this;
        }
    }
    /**
    * Multiply each element in this matrix with the specified scalar.
    * @example
    *   m1.multiply(2);
    *   //  [2 4]
    *   //  [4 6]
    */
    scalarMultiply(scalar) {
        for (let i = 0; i < this.height(); i++)
            for (let j = 0; j < this.width(); j++)
                this._store[i][j] = parseFloat((this._store[i][j] * scalar).toFixed(15));
        return this;
    }
    /**
    * Returns the row correponding to the specified index.
    * @example
    *   m1.row(0);  //  [1,2]
    */
    row(index) {
        if (index >= this.height()) {
            throw new Error("Row index out of bounds.");
        }
        else {
            return new NumberMatrixRow(this, index);
        }
    }
    /**
    * Returns the column correponding to the specified index.
    * @example
    *   m1.col(1);  //  [2,3]
    */
    col(index) {
        if (index >= this.width()) {
            throw new Error("Column index out of bounds.");
        }
        else {
            return new NumberMatrixColumn(this, index);
        }
    }
}
exports.NumberMatrix = NumberMatrix;
/**
* A single row of a NumberMatrix.
* Is obtained by calling row() method of a NumberMatrix instance.
*/
class NumberMatrixRow extends array_matrix_1.ArrayMatrixRow {
    constructor(matrix, index) {
        super(matrix, index);
        this._matrix = matrix;
    }
    /**
    * Return the matrix to which this row belong.
    */
    get matrix() {
        return this._matrix;
    }
    add(row, coeff = 1) {
        if (this._matrix !== row.matrix) {
            throw new Error("Row change operation is not compatable with rows of two different matrices.");
        }
        else {
            for (let j = 0; j < this._matrix.width(); j++) {
                let a1 = this._matrix.get(this._index, j);
                let a2 = this._matrix.get(row.index, j);
                this._matrix.put(this._index, j, a1 + coeff * a2);
            }
        }
    }
    /**
    * Multiply all entries of a row by a non-zero scalar.
    * @example
    *   //nm:NumberMatrix.
    *   let r1 = nm.row(0);
    *   r1.multiply(5); // R1 -> 5.R1
    */
    multiply(scalar) {
        if (scalar === 0) {
            throw new Error("Row multiplication does not support multiplication with 0");
        }
        else {
            for (let j = 0; j < this._matrix.width(); j++) {
                let a1 = this._matrix.get(this._index, j);
                this._matrix.put(this._index, j, parseFloat((scalar * a1).toFixed(15)));
            }
        }
    }
}
exports.NumberMatrixRow = NumberMatrixRow;
/**
* A single column of a NumberMatrix.
* Is obtained by calling col() method of a NumberMatrix instance.
*/
class NumberMatrixColumn extends array_matrix_1.ArrayMatrixColumn {
    constructor(matrix, index) {
        super(matrix, index);
        this._matrix = matrix;
    }
    /**
    * Return the matrix to which this column belong.
    */
    get matrix() {
        return this._matrix;
    }
    add(col, coeff = 1) {
        if (this._matrix !== col.matrix) {
            throw new Error("Column change operation is not compatable with rows of two different matrices.");
        }
        else {
            for (let i = 0; i < this._matrix.height(); i++) {
                let a1 = this._matrix.get(i, this._index);
                let a2 = this._matrix.get(i, col.index);
                this._matrix.put(i, this._index, a1 + parseFloat((coeff * a2).toFixed(15)));
            }
        }
    }
    /**
    * Multiply all entries of a column by a non-zero scalar.
    * @example
    *   //nm:NumberMatrix.
    *   let c1 = nm.col(0);
    *   c1.multiply(5); // C1 -> 5.C1
    */
    multiply(scalar) {
        if (scalar === 0) {
            throw new Error("Column multiplication does not support multiplication with 0");
        }
        else {
            for (let i = 0; i < this._matrix.height(); i++) {
                let a1 = this._matrix.get(i, this._index);
                this._matrix.put(i, this._index, parseFloat((scalar * a1).toFixed(15)));
            }
        }
    }
}
exports.NumberMatrixColumn = NumberMatrixColumn;
