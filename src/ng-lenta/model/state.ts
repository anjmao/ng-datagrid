import { Injectable, TemplateRef } from '@angular/core';
import { LentaColumn } from '../public-types';
import { isDefined } from '../util/value-util';

export class BodyCell {
    constructor(public value: any, public column: string, public template: TemplateRef<any>) { }
}

export class BodyRow {
    constructor(public ref: any, public cells: BodyCell[], public template: TemplateRef<any>) { }
}

export class HeaderCell {
    public value: string;
    constructor(col: LentaColumn) {
        this.value = isDefined(col.name) ? col.name : col.prop;
    }
}

export interface ViewTemplates {
    bodyCellTemplates: Map<string, TemplateRef<any>>;
    bodyRowTemplate: TemplateRef<any>
}

@Injectable()
export class State {
    private _rows: BodyRow[] = [];
    private _viewRows: BodyRow[] = [];
    private _colMap: Map<string, LentaColumn>;
    private _cols: LentaColumn[] = [];
    private _headerCells: HeaderCell[] = [];
    private _pageSize: number;

    get rows() {
        return this._rows;
    }

    get viewRows() {
        return this._viewRows;
    }

    get cols() {
        return this._cols;
    }

    get headerCells() {
        return this._headerCells;
    }

    set pageSize(value: number) {
        this._pageSize = value;
    }

    setPage(page: number) {
        if (!isDefined(this._pageSize)) {
            this._viewRows = [...this.rows];
            return;
        }
        const startIndex = (page - 1) * this._pageSize;
        const endIndex = startIndex + this._pageSize;
        this._viewRows = [...this.rows.slice(startIndex, endIndex)];
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

    setColumns(cols: LentaColumn[]) {
        this._headerCells = [];
        this._cols = cols;
        this._colMap = new Map<string, LentaColumn>();
        for (const col of this._cols) {
            this._headerCells.push(new HeaderCell(col))
            this._colMap.set(col.prop, col);
        }
    }
}
