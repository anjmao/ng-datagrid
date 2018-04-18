import { Injectable } from '@angular/core';
import { Column } from '../public-types';

export class BodyCell {
    constructor(public value: any) {}
}

export class BodyRow {
    constructor(public cells: BodyCell[] = []) {}
}

@Injectable()
export class LentaList {
    private _rows: BodyRow[] = [];
    private _colMap: Map<string, Column>;
    private _cols: Column[] = [];

    get rows() {
        return this._rows;
    }

    get cols() {
        return this._cols;
    }

    setRows(rows: any[]) {
        if (rows.length > 0 && !this._colMap) {
            throw new Error('Columns should be set.');
        }

        this._rows = [];
        for (const row of rows) {
            const cells: BodyCell[] = [];
            for (const key in row) {
                if (row.hasOwnProperty(key)) {
                    const col = this._colMap.get(key);
                    if (!col) {
                        continue;
                    }
                    const value = row[key];
                    const cell = new BodyCell(value);
                    cells.push(cell);
                }
            }
            this._rows.push(new BodyRow(cells));
        }
    }

    setColumns(cols: Column[]) {
        this._cols = cols;
        this._colMap = new Map<string, Column>();
        for (const col of this._cols) {
            this._colMap.set(col.prop, col);
        }
    }
}
