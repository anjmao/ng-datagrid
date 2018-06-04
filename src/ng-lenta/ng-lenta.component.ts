import {
    Component,
    OnChanges,
    Input,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    QueryList,
    ContentChildren,
    TemplateRef,
    ContentChild,
    ChangeDetectorRef,
    OnDestroy
} from '@angular/core';

import { LentaState, ViewTemplates, HeaderCell } from './model/lenta-state';
import { LentaColumn } from './model/lenta-column';
import { BodyCellTemplateDirective } from './body/cell/body-cell-template.directive';
import { BodyRowTemplateDirective } from './body/row/body-row-template.directive';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LentaOptions } from './model/lenta-options';
import { NgLentaApi } from './model/lenta-api';

@Component({
    selector: 'ng-lenta',
    providers: [LentaState],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./ng-lenta.component.scss'],
    host: {
        'class': 'ngl-table',
        'role': 'grid'
    },
    template: `
        <ngl-header [cells]="state.headerCells" (onSort)="sort($event)"></ngl-header>
        <ngl-body>
            <ngl-body-row *ngFor="let row of state.viewRows" [row]="row"></ngl-body-row>
        </ngl-body>
        <ngl-footer>
            <ngl-paging
                (pageChange)="pageChange($event)"
                (pageSizeChange)="pageSizeChange($event)"
                [totalCount]="totalCount"
                [maxSize]="options.paging.maxSize"
                [pageSize]="state.pageSize"
                [page]="state.currentPage">
            </ngl-paging>
        </ngl-footer>
    `
})
export class NgLentaComponent implements OnChanges, OnDestroy {
    @Input() api: NgLentaApi | null = null;
    @ContentChildren(BodyCellTemplateDirective) bodyCellTemplates: QueryList<BodyCellTemplateDirective> | null = null;
    @ContentChild(BodyRowTemplateDirective) bodyRowTemplate: BodyRowTemplateDirective | null = null;

    totalCount = 0;
    options: LentaOptions;

    private _destroy$ = new Subject<void>();
    constructor(
        public state: LentaState,
        _defaultOptions: LentaOptions,
        private _cd: ChangeDetectorRef
    ) {
        this.options = new LentaOptions(null);
        this.options.mergeOptions(_defaultOptions);
        this.state.setInitialPageSize(this.options.paging.pageSize);
    }

    ngOnChanges() {
    }

    ngAfterContentInit() {
        if (!this.api) {
            return;
        }
        this.api._options$.pipe(takeUntil(this._destroy$)).subscribe((opts) => {
            this.options.mergeOptions(opts);
            this._cd.markForCheck();
        });
        this.api._columns$.pipe(takeUntil(this._destroy$)).subscribe((columns) => {
            this._setColumns(columns);
            this._cd.markForCheck();
        });
        this.api._rows$.pipe(takeUntil(this._destroy$)).subscribe((rows) => {
            if (this.options.clientSide) {
                this.totalCount = rows.length;
            }
            this._setRows(rows);
            this.state.setPage(1);
            this._cd.markForCheck();
        });

        this.api._page$.pipe(takeUntil(this._destroy$)).subscribe((page) => {
            this.state.setPage(page);
            this._cd.markForCheck();
        });

        this.api._nextPage$.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this.state.setNextPage();
            this._cd.markForCheck();
        });

        this.api._previousPage$.pipe(takeUntil(this._destroy$)).subscribe(() => {
            this.state.setPreviousPage();
            this._cd.markForCheck();
        });
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    pageChange(page: number) {
        this.state.setPage(page);
        this.api!.pageChange$.next(page);
        this._cd.markForCheck();
    }

    pageSizeChange(size: number) {
        this.state.updatePageSize(size);
        this.api!.pageSizeChange$.next(size);
        this._cd.markForCheck();
    }

    sort(cell: HeaderCell) {
        this.state.sort(cell);
        this._cd.markForCheck();
    }

    private _setColumns(columns: LentaColumn[]) {
        this.state.setColumns(columns);
    }

    private _setRows(rows: any[]) {
        const templates: ViewTemplates = {
            bodyCellTemplates: null,
            bodyRowTemplate: this.bodyRowTemplate ? this.bodyRowTemplate.templateRef : null
        };

        if (!templates.bodyRowTemplate && this.bodyCellTemplates) {
            const cellTemplatesRefMap = new Map<string, TemplateRef<any>>();
            this.bodyCellTemplates.forEach((t) => {
                cellTemplatesRefMap.set(t.column, t.templateRef);
            });
            templates.bodyCellTemplates = cellTemplatesRefMap;
        }

        this.state.setRows(rows, templates);
    }
}
