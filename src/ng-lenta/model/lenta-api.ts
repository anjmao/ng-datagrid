import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { isArray } from '../util/value-util';
import { LentaColumn, LentaColumnCtor, LentaColumns } from './lenta-column';
import { LentaOptionsCtor, LentaOptions } from './lenta-options';

export class NgLentaApi {
    _rows$ = new BehaviorSubject<any[]>([]);
    _columns$ = new BehaviorSubject<LentaColumn[]>([]);
    _options$ = new Subject<LentaOptions>();
    _page$ = new BehaviorSubject<number>(1);
    _nextPage$ = new Subject<void>();
    _previousPage$ = new Subject<void>();
    pageChange$ = new Subject<number>();
    // private _columns: LentaColumn[] = [];
    // private _page = 1;
    // private _totalCount = 0;
    // private _options: LentaOptions = new LentaOptions(null);

    setRows(rows: Observable<any[]> | any[]) {
        if (isArray(rows)) {
            this._rows$.next(rows as any[]);
        } else {
            (rows as Observable<any[]>).subscribe((res) => {
                this._rows$.next(res);
            });
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
