import { Injectable, TemplateRef } from '@angular/core';
import { LentaColumn } from './lenta-column';
import { isDefined } from '../util/value-util';
import { LentaOptions } from './lenta-options';

export enum SortOrder {
    none = 'none',
    asc = 'asc',
    desc = 'desc'
}

export class BodyCell {
    constructor(public value: any, public col: LentaColumn, public template: TemplateRef<any> | null | undefined) { }
}

export class BodyRow {
    constructor(public ref: any, public cells: BodyCell[], public template: TemplateRef<any> | null | undefined) { }
}

export class HeaderCell {
    value = '';
    sortable: boolean;
    sortOrder = SortOrder.none;
    hideSortIcon = false;
    constructor(public col: LentaColumn) {
        this.value = isDefined(col.name) ? <string>col.name : col.prop;
        this.sortable = col.sortable || true;
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
    bodyCellTemplates: Map<string, TemplateRef<any>> | null;
    bodyRowTemplate: TemplateRef<any> | null
}

@Injectable()
export class LentaState {
    private _rows: BodyRow[] = [];
    private _sortedRows: BodyRow[] = [];
    private _viewRows: BodyRow[] = [];
    private _colMap = new Map<string, LentaColumn>();
    private _cols: LentaColumn[] = [];
    private _headerCells: HeaderCell[] = [];
    private _pageSize = 0;
    private _currentPage = 1;

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

    get pageSize() {
        return this._pageSize;
    }

    get currentPage() {
        return this._currentPage;
    }

    constructor(private _options: LentaOptions) {
        this._pageSize = _options.paging.pageSize;
    }

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

    refreshPage() {
        this.setPage(this._currentPage);
    }

    setInitialPageSize(size: number) {
        this._pageSize = size;
    }

    updatePageSize(size: number) {
        this._pageSize = size;
        this.setPage(this._currentPage);
    }

    setNextPage() {
        this.setPage(this.currentPage + 1);
    }

    setPreviousPage() {
        this.setPage(this.currentPage - 1);
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
            const nameA = propA.toString().toLowerCase();
            const nameB = propB.toString().toLowerCase();
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
        if (rows.length > 0 && this._colMap.size === 0) {
            throw new Error('Columns should be set first.');
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
                cells.push(new BodyCell(value, col, cellTemplate));
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
