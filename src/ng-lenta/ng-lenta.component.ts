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
    TemplateRef
} from '@angular/core';

import { LentaList } from './model/list';
import { Column } from './public-types';
import { BodyCellTemplateDirective } from './body/cell/body-cell-template.directive';

@Component({
    selector: 'ng-lenta',
    providers: [LentaList],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./ng-lenta.component.scss'],
    host: {
        'class': 'ngl-table',
        'role': 'grid'
    },
    template: `
        <ngl-header>
            <ngl-header-cell *ngFor="let cell of list.headerCells"[cell]="cell"></ngl-header-cell>
        </ngl-header>
        <ngl-body>
            <ngl-body-row *ngFor="let row of list.rows" [row]="row" [cellTemplates]="bodyCellTemplates"></ngl-body-row>
        </ngl-body>
        <ngl-footer></ngl-footer>
    `
})
export class NgLentaComponent implements OnInit, OnChanges {
    @Input() rows: any[] = [];
    @Input() columns: Column[] = [];
    @ContentChildren(BodyCellTemplateDirective) bodyCellTemplates: QueryList<BodyCellTemplateDirective>;

    // private _pendingRows;

    constructor(public list: LentaList) { }

    ngOnInit() { }

    ngOnChanges(c: SimpleChanges) {
        if (c.columns) {
            this.setColumns(c.columns.currentValue);
        }
        if (c.rows) {
            if (this.bodyCellTemplates) {
                this.setRows(c.rows.currentValue);
            } else {
                // this._pendingRows = c.rows;
            }
        }
    }

    ngAfterContentInit() {
        // if (this._pendingRows) {
        //     this.setRows(this._pendingRows);
        //     this._pendingRows = null;
        // }
    }

    private setColumns(columns: Column[]) {
        this.list.setColumns(columns);
    }

    private setRows(rows: any[]) {
        console.log(this.bodyCellTemplates);
        const map = new Map<string, TemplateRef<any>>();
        this.bodyCellTemplates.forEach((t) => {
            map.set(t.column, t.templateRef);
        })
        this.list.setRows(rows, { bodyCellTemplates: map });
    }
}
