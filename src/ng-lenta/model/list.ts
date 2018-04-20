import { Injectable, TemplateRef } from '@angular/core';
import { Column } from '../public-types';
import { isDefined } from '../utils/value-utils';

export class BodyCell {
    constructor(public value: any, public column: string, public template: TemplateRef<any>) { }
}

export class BodyRow {
    constructor(public ref: any, public cells: BodyCell[], public template: TemplateRef<any>) { }
}

export class HeaderCell {
    public value: string;
    constructor(col: Column) {
        this.value = isDefined(col.name) ? col.name : col.prop;
    }
}

export interface ViewTemplates {
    bodyCellTemplates: Map<string, TemplateRef<any>>;
    bodyRowTemplate: TemplateRef<any>
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

    setRows(rows: any[], templates: ViewTemplates) {
        if (rows.length > 0 && !this._colMap) {
            throw new Error('Columns should be set.');
        }

        this._rows = [];
        for (const row of rows) {
            const cells: BodyCell[] = [];
            for (const col of this._cols) {
                if (row[col.prop] === undefined) {
                    continue;
                }
                const cellTemplate = templates.bodyCellTemplates && templates.bodyCellTemplates.get(col.prop);
                const value = row[col.prop];
                cells.push(new BodyCell(value, col.prop, cellTemplate));
            }
            this._rows.push(new BodyRow(row, cells, templates.bodyRowTemplate));
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
