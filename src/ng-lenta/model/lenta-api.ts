import { BehaviorSubject, Observable, Subject, ReplaySubject } from 'rxjs';
import { isArray } from '../util/value-util';
import { LentaColumn, LentaColumnCtor, LentaColumns } from './lenta-column';
import { LentaOptionsCtor, LentaOptions } from './lenta-options';

export interface RowsStream {
    rows: any[];
    totalCount: number;
}

export class NgLentaApi {
    _rows$ = new BehaviorSubject<any[]>([]);
    // TODO: find better name?
    _rowsStream$ = new ReplaySubject<Observable<RowsStream>>();
    _columns$ = new BehaviorSubject<LentaColumn[]>([]);
    _options$ = new Subject<LentaOptions>();
    _page$ = new BehaviorSubject<number>(1);
    _nextPage$ = new Subject<void>();
    _previousPage$ = new Subject<void>();
    pageChange$ = new Subject<number>();
    pageSizeChange$ = new Subject<number>();

    setRows(rows: Observable<RowsStream> | any[]) {
        if (isArray(rows)) {
            this._rows$.next(rows as any[]);
        } else {
            this._rowsStream$.next(rows as Observable<RowsStream>);
        }
        return this;
    }

    setColumns(cols: LentaColumnCtor[]) {
        const columns = LentaColumns.create(cols);
        this._columns$.next(columns);
        return this;
    }

    setOptions(opts: LentaOptionsCtor) {
        this._options$.next(new LentaOptions(opts));
        return this;
    }

    setPage(page: number) {
        this._page$.next(page);
        return this;
    }

    setNextPage() {
        this._nextPage$.next();
        return this;
    }

    setPreviousPage() {
        this._previousPage$.next();
        return this;
    }
}
