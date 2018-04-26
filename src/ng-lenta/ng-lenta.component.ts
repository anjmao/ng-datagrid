import {
    Component,
    OnInit,
    OnChanges,
    Input,
    SimpleChanges,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    QueryList,
    ContentChildren,
    TemplateRef,
    ContentChild,
    ChangeDetectorRef,
    OnDestroy
} from '@angular/core';

import { State, ViewTemplates, HeaderCell } from './model/state';
import { LentaColumn, LentaOptions } from './public-types';
import { BodyCellTemplateDirective } from './body/cell/body-cell-template.directive';
import { BodyRowTemplateDirective } from './body/row/body-row-template.directive';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { Options } from './model/options';

@Component({
    selector: 'ng-lenta',
    providers: [State],
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
                (pageChange)="changePage($event)"
                [totalCount]="totalCount"
                [page]="page">
            </ngl-paging>
        </ngl-footer>
    `
})
export class NgLentaComponent implements OnInit, OnChanges, OnDestroy {
    @Input() rows: any[] = [];
    @Input() columns: LentaColumn[] = [];
    @Input() page = 1;
    @Input() totalCount = 0;
    @Input() options: LentaOptions;

    @ContentChildren(BodyCellTemplateDirective) bodyCellTemplates: QueryList<BodyCellTemplateDirective> | null = null;
    @ContentChild(BodyRowTemplateDirective) bodyRowTemplate: BodyRowTemplateDirective | null = null;

    private _pendingRows$ = new Subject<any[]>();
    private _destroy$ = new Subject<void>();

    constructor(
        public state: State,
        private _options: Options,
        private _cd: ChangeDetectorRef
    ) {
        this.options = this._options;
        this.state.pageSize = this._options.paging.pageSize;
    }

    ngOnInit() {
        this._options.mergePublicOptions(this.options);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.columns) {
            this._setColumns(changes.columns.currentValue);
        }

        if (changes.rows) {
            this._pendingRows$.next(this.rows);
        }
    }

    ngAfterContentInit() {
        this._pendingRows$.pipe(takeUntil(this._destroy$)).subscribe((rows) => {
            if (this._options.clientSide) {
                this.totalCount = rows.length;
            }
            this._setRows(rows);
            this.state.setPage(this.page);
        });
    }

    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }

    changePage(page: number) {
        this.state.setPage(page);
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
