"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* A 2 dimensional array implementation of Matrix.
*/
class ArrayMatrix {
    constructor(height, width, defaultValue) {
        if (defaultValue !== undefined) {
            this._store = Array.apply(null, Array(height)).map(() => (Array.apply(null, Array(width)).map(() => (defaultValue))));
        }
        else
            this._store = Array.apply(null, Array(height)).map(() => (new Array(width)));
    }
    /**
    * Read the item at the specified position in this matrix.
    * @example
    *   //  [1 2 3]
    *   //  [2 3 4]
    *   //  [3 4 5]
    *   matrix.get(1,1); //3
    */
    get(rowIndex, columnIndex) {
        return this._store[rowIndex] && this._store[rowIndex][columnIndex];
    }
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
    put(rowIndex, columnIndex, item) {
        this._store[rowIndex][columnIndex] = item;
    }
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
    transpose() {
        let transpose = new this.constructor(this.width(), this.height());
        for (let i = 0; i < this.height(); i++) {
            for (let j = 0; j < this.width(); j++) {
                transpose.put(j, i, this.get(i, j));
            }
        }
        return transpose;
    }
    /**
    * Returns the number of rows in this matrix.
    * @example
    *   matrix.height(); //return 3
    */
    height() {
        return this._store.length;
    }
    /**
    * Returns the number of columns in this matrix.
    * @example
    *   matrix.width(); //return 3
    */
    width() {
        return this._store[0].length;
    }
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
    subMatrix(rows, cols) {
        let subMatrix = new this.constructor(this.height() - rows.length, this.width() - cols.length);
        for (let i = 0, k = 0; i < this.height(); i++) {
            if (rows.indexOf(i) == -1) {
                for (let j = 0, l = 0; j < this.width(); j++) {
                    if (cols.indexOf(j) == -1) {
                        subMatrix.put(k, l, this.get(i, j));
                        l++;
                    }
                }
                k++;
            }
        }
        return subMatrix;
    }
    /**
    * Returns the row correponding to the specified index.
    * @example
    *   //  [1 2 3]
    *   //  [4 5 6]
    *   //  [7 8 9]
    *   matrix.row(1); //[4,5,6]
    */
    row(index) {
        if (index >= this.height()) {
            throw new Error("Row index out of bounds.");
        }
        else {
            return new ArrayMatrixRow(this, index);
        }
    }
    /**
    * Returns the column correponding to the specified index.
    * @example
    *   //  [1 2 3]
    *   //  [4 5 6]
    *   //  [7 8 9]
    *   matrix.col(1); //[2,5,8]
    */
    col(index) {
        if (index >= this.width()) {
            throw new Error("Column index out of bounds.");
        }
        else {
            return new ArrayMatrixColumn(this, index);
        }
    }
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
    equals(matrix) {
        //check if same size
        if (this.height() === matrix.height() && this.width() === matrix.width()) {
            //check each element
            let flag = true;
            for (let i = 0; i < this.height(); i++)
                for (let j = 0; j < this.height(); j++) {
                    if (this.get(i, j) !== matrix.get(i, j)) {
                        flag = false;
                        break;
                    }
                }
            return flag;
        }
        return false;
    }
    /**
    * Return a 2 dimensional array corresponding to the matrix.
    * @example
    *   //  [1 2 3]
    *   //  [4 5 6]
    *   //  [7 8 9]
    *   matrix.toArray(); //[[1,2,3],[4,5,6],[7,8,9]]
    */
    toArray() {
        let arr = Array.apply(null, Array(this.height())).map(() => (new Array(this.width())));
        for (let i = 0; i < this.height(); i++) {
            for (let j = 0; j < this.width(); j++) {
                arr[i][j] = this.get(i, j);
            }
        }
        return arr;
    }
    /**
    * Create a copy of the current object and return
    * @example
    *   matrix.clone();
    */
    clone() {
        let newMatrix = new this.constructor(this.height(), this.width());
        for (let i = 0; i < this.height(); i++) {
            for (let j = 0; j < this.width(); j++) {
                newMatrix.put(i, j, this.get(i, j));
            }
        }
        return newMatrix;
    }
}
exports.ArrayMatrix = ArrayMatrix;
/**
* A single row of an ArrayMatrix.
*/
class ArrayMatrixRow {
    constructor(matrix, index) {
        this._matrix = matrix;
        this._index = Math.abs(index);
    }
    /**
    * Return the matrix to which this row belong.
    */
    get matrix() {
        return this._matrix;
    }
    /**
    * Return the index of this row in the matrix it belongs to.
    */
    get index() {
        return this._index;
    }
    /**
    * Change this matrix row with another row of same matrix.
    * @example
    *   //am:ArrayMatrix
    *   let r1 = am.row(0);
    *   let r2 = am.row(1);
    *   r1.change(r2);  // corresponds to R1 -> R2
    */
    change(row) {
        if (this._matrix !== row.matrix) {
            throw new Error("Row change operation is not compatable with rows of two different matrices.");
        }
        else {
            for (let j = 0; j < this._matrix.width(); j++) {
                this._matrix.put(this._index, j, this._matrix.get(row.index, j));
            }
        }
    }
    /**
    * Interchange this row with another row of the same matrix.
    * @example
    *   //am:ArrayMatrix
    *   let r1 = am.row(0);
    *   let r2 = am.row(1);
    *   r1.interchange(r2);  // corresponds to R1 <-> R2
    */
    interchange(row) {
        if (this._matrix !== row.matrix) {
            throw new Error("Row interchange operation is not compatable with rows of two different matrices.");
        }
        else {
            for (let j = 0; j < this._matrix.width(); j++) {
                let temp = this._matrix.get(row.index, j);
                this._matrix.put(row.index, j, this._matrix.get(this._index, j));
                this._matrix.put(this._index, j, temp);
            }
        }
    }
    /**
    * Return an array corresponding to this row.
    * @example
    *   //am:ArrayMatrix
    *   //  [1 0 0]
    *   //  [0 1 0]
    *   //  [0 0 1]
    *   am.row(1).toArray() // [0,1,0]
    */
    toArray() {
        let arr = [];
        for (let j = 0; j < this._matrix.width(); j++) {
            arr.push(this._matrix.get(this._index, j));
        }
        return arr;
    }
}
exports.ArrayMatrixRow = ArrayMatrixRow;
/**
* A single column of an ArrayMatrix.
*/
class ArrayMatrixColumn {
    constructor(matrix, index) {
        this._matrix = matrix;
        this._index = Math.abs(index);
    }
    /**
    * Return the matrix to which this column belong.
    */
    get matrix() {
        return this._matrix;
    }
    /**
    * Return the index of this colun in the matrix it belongs to.
    */
    get index() {
        return this._index;
    }
    /**
    * Change this matrix column with another column of same matrix.
    * @example
    *   //am:ArrayMatrix
    *   let c1 = am.col(0);
    *   let c2 = am.col(1);
    *   c1.change(c2);  // corresponds to C1 -> C2
    */
    change(col) {
        if (this._matrix !== col.matrix) {
            throw new Error("Column change operation is not compatable with rows of two different matrices.");
        }
        else {
            for (let i = 0; i < this._matrix.height(); i++) {
                this._matrix.put(i, this._index, this._matrix.get(i, col.index));
            }
        }
    }
    /**
    * Interchange this column with another column of the same matrix.
    * @example
    *   //am:ArrayMatrix
    *   let c1 = am.col(0);
    *   let c2 = am.col(1);
    *   c1.interchange(c2);  // corresponds to C1 <-> C2
    */
    interchange(col) {
        if (this._matrix !== col.matrix) {
            throw new Error("Row interchange operation is not compatable with rows of two different matrices.");
        }
        else {
            for (let i = 0; i < this._matrix.height(); i++) {
                let temp = this._matrix.get(i, col.index);
                this._matrix.put(i, col.index, this._matrix.get(i, this._index));
                this._matrix.put(i, this._index, temp);
            }
        }
    }
    /**
    * Return an array corresponding to this column.
    * @example
    *   //am:ArrayMatrix
    *   //  [1 1 1]
    *   //  [0 1 1]
    *   //  [0 0 1]
    *   am.col(1).toArray() // [1,1,0]
    */
    toArray() {
        let arr = [];
        for (let i = 0; i < this._matrix.width(); i++) {
            arr.push(this._matrix.get(i, this._index));
        }
        return arr;
    }
}
exports.ArrayMatrixColumn = ArrayMatrixColumn;
