import { Injectable } from '@angular/core';
import { Column } from '../public-types';
import { isDefined } from '../utils/value-utils';

export class BodyCell {
    constructor(public value: any) {}
}

export class BodyRow {
    constructor(public cells: BodyCell[] = []) {}
}

export class HeaderCell {
    public value: string;
    constructor(col: Column) {
        this.value = isDefined(col.name) ? col.name : col.prop;
    }
}

@Injectable()
export class LentaList {
    private _rows: BodyRow[] = [];
    private _colMap: Map<string, Column>;
    private _cols: Column[] = [];
    private _headerCells: HeaderCell[] = [];

    get rows() {
        return this._rows;
    }

    get cols() {
        return this._cols;
    }

    get headerCells() {
        return this._headerCells;
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
        this._headerCells = [];
        this._cols = cols;
        this._colMap = new Map<string, Column>();
        for (const col of this._cols) {
            this._headerCells.push(new HeaderCell(col))
            this._colMap.set(col.prop, col);
        }
    }
}
