import { Injectable, TemplateRef } from '@angular/core';
import { LentaColumn } from '../public-types';
import { isDefined } from '../util/value-util';
import { Options } from './options';

export enum SortOrder {
    none = 'none',
    asc = 'asc',
    desc = 'desc'
}

export class BodyCell {
    constructor(public value: any, public template: TemplateRef<any>) { }
}

export class BodyRow {
    constructor(public ref: any, public cells: BodyCell[], public template: TemplateRef<any>) { }
}

export class HeaderCell {
    value: string;
    sortable: boolean;
    sortOrder: SortOrder = SortOrder.none;
    hideSortIcon = false;
    constructor(public col: LentaColumn) {
        this.value = isDefined(col.name) ? col.name : col.prop;
        this.sortable = col.sortable;
    }

    toggleSortOrder() {
        switch (this.sortOrder) {
            case SortOrder.none:
            this.sortOrder = SortOrder.asc;
            break;
            case SortOrder.asc:
            this.sortOrder = SortOrder.desc;
            break;
            case SortOrder.desc:
            this.sortOrder = SortOrder.none;
            break;
        }
    }
}

export interface ViewTemplates {
    bodyCellTemplates: Map<string, TemplateRef<any>>;
    bodyRowTemplate: TemplateRef<any>
}

@Injectable()
export class State {
    private _rows: BodyRow[] = [];
    private _sortedRows: BodyRow[] = [];
    private _viewRows: BodyRow[] = [];
    private _colMap: Map<string, LentaColumn>;
    private _cols: LentaColumn[] = [];
    private _headerCells: HeaderCell[] = [];
    private _pageSize: number;
    private _currentPage: number;

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

    constructor(private _options: Options) { }

    setPage(page: number) {
        this._currentPage = page;
        if (!isDefined(this._pageSize)) {
            this._viewRows = [...this._sortedRows];
            return;
        }
        const startIndex = (page - 1) * this._pageSize;
        const endIndex = startIndex + this._pageSize;
        this._viewRows = [...this._sortedRows.slice(startIndex, endIndex)];
    }

    sort(cell: HeaderCell) {
        if (cell.sortOrder === SortOrder.none) {
            this._sortedRows = [...this._rows];
            this.setPage(this._currentPage);
            return;
        }
        this._sortedRows.sort((a: BodyRow, b: BodyRow) => {
            const propA = a.ref[cell.col.prop];
            const propB = b.ref[cell.col.prop];
            if (!isDefined(propA) || !isDefined(propB)) {
                return 0;
            }
            const nameA = propA.toString().toUpperCase();
            const nameB = propB.toString().toUpperCase();
            if (cell.sortOrder === SortOrder.asc) {
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            } else if (cell.sortOrder === SortOrder.desc) {
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
            }
            return 0;
        });
        this.setPage(this._currentPage);
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
                cells.push(new BodyCell(value, cellTemplate));
            }
            this._rows.push(new BodyRow(row, cells, templates.bodyRowTemplate));
        }
        this._sortedRows = [...this._rows];
    }

    setColumns(cols: LentaColumn[]) {
        this._headerCells = [];
        this._cols = cols;
        this._colMap = new Map<string, LentaColumn>();
        for (const col of this._cols) {
            if (!isDefined(col.sortable)) {
                col.sortable = this._options.sorting.enabled;
            }
            this._headerCells.push(new HeaderCell(col))
            this._colMap.set(col.prop, col);
        }
    }
}
