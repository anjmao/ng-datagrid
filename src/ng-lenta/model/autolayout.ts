import { Injectable } from '@angular/core';
import { BodyCell } from './state';
import { Options } from './options';
import { Subject } from 'rxjs/Subject';

interface CellMeta {
    width: number;
}

interface CellEntry {
    cell: BodyCell;
    meta: CellMeta;
}

export type MaxCellWithMap = Map<string, number>;

@Injectable()
export class AutoLayout {
    public readonly done$ = new Subject<MaxCellWithMap>();
    private _entries: CellEntry[] = [];
    private _done = false;

    constructor(private _options: Options) { }

    get enabled() {
        return this._options.autoLayout && !this._done;
    }

    addCellInfo(cell: BodyCell, meta: { width: number }) {
        this._entries.push({ cell: cell, meta: meta });
    }

    done() {
        let max = new Map<string, number>();
        for (const e of this._entries) {
            const colWidth = e.meta.width;
            const key = e.cell.col.prop;
            const maxColWidth = max.get(key) || 0;
            if (colWidth > maxColWidth) {
                max.set(key, colWidth)
            }
        }
        this._done = true;
        this.done$.next(max);
        return max;
    }
}
