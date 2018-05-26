"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const number_matrix_1 = require("./number-matrix");
/**
* A NumberMatrix with equal number of rows and columns.
*/
class SquareMatrix extends number_matrix_1.NumberMatrix {
    constructor(order, defaultValue = 0) {
        super(order, order, defaultValue);
    }
    /**
    * Returns identity matrix of the given order.
    * @example
    *   let m1 = SquareMatrix.identity(3);
    *   //  m1:
    *   //  [1 0 0]
    *   //  [0 1 0]
    *   //  [0 0 1]
    */
    static identity(order) {
        let id = new SquareMatrix(order);
        for (let i = 0; i < order; i++) {
            id.put(i, i, 1);
        }
        return id;
    }
    /**
    * Create a square matrix from the number matrix of same height and width.
    */
    static cast(matrix) {
        if (matrix.height() !== matrix.width()) {
            throw new Error(`The matrix ${matrix} cannot be casted to SquareMatrix`);
        }
        else {
            let ord = matrix.height();
            let sq = new SquareMatrix(ord);
            for (let i = 0; i < ord; i++) {
                for (let j = 0; j < ord; j++) {
                    sq.put(i, j, matrix.get(i, j));
                }
            }
            return sq;
        }
    }
    /**
    * Returns the order of the matrix.
    */
    order() {
        return this.height();
    }
    /**
    * Check whether this matrix is symmetric or not.
    */
    isSymmetric() {
        let t = this.transpose();
        return this.equals(t);
    }
    /**
    * Check whether this matrix is skew-symmetric or not.
    */
    isSkewSymmetric() {
        let t = this.transpose().scalarMultiply(-1);
        return this.equals(t);
    }
    /**
    * Returns the minor of the element specified by the indices.
    */
    minor(rowIndex, columnIndex) {
        return this.subMatrix([rowIndex], [columnIndex]).determinant();
    }
    /**
    * Returns the cofactor of the element specified by the indices.
    */
    cofactor(rowIndex, columnIndex) {
        return this.minor(rowIndex, columnIndex) * Math.pow(-1, rowIndex + columnIndex);
    }
    /**
    * Returns the determinant of the square matrix.
    */
    determinant() {
        if (this.order() < 1) {
            throw new Error("Empty matrices do not have determinants.");
        }
        else if (this.order() == 1) {
            return this.get(0, 0);
        }
        else {
            let sign = 1;
            let det = 0;
            for (let i = 0; i < this.order(); i++) {
                det += sign * this.get(0, i) * this.minor(0, i);
                sign *= -1;
            }
            return det;
        }
    }
    /**
    * Returns the matrix of minors of this matrix.
    */
    minorMatrix() {
        let mm = new this.constructor(this.order());
        for (let i = 0; i < this.order(); i++) {
            for (let j = 0; j < this.order(); j++) {
                mm.put(i, j, this.minor(i, j));
            }
        }
        return mm;
    }
    /**
    * Returns the matrix of cofactors of this matrix.
    */
    cofactorMatrix() {
        let mm = new this.constructor(this.order());
        for (let i = 0; i < this.order(); i++) {
            for (let j = 0; j < this.order(); j++) {
                mm.put(i, j, this.cofactor(i, j));
            }
        }
        return mm;
    }
    /**
    * Returns the adjoint of this matrix.
    */
    adjoint() {
        return this.cofactorMatrix().transpose();
    }
    /**
    * Return the inverse of this matrix if any. If not it returns null.
    */
    inverse() {
        let det = this.determinant();
        if (det === 0)
            return null;
        else {
            return this.adjoint().scalarMultiply(1 / det);
        }
    }
    /**
    * Returns the trace of this square matrix. (Trace is the sum of diagonal values of a square matrix.)
    */
    trace() {
        let tr = 0;
        for (let i = 0; i < this.order(); i++) {
            tr += this._store[i][i];
        }
        return tr;
    }
}
exports.SquareMatrix = SquareMatrix;
