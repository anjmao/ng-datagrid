import { 
    Component,
    OnInit,
    OnChanges,
    Input,
    SimpleChanges,
    ChangeDetectionStrategy,
    ViewEncapsulation
} from '@angular/core';

import { LentaList } from './model/list';
import { Column } from './public-types';

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
        <ngl-header [cells]="list.headerCells"></ngl-header>
        <ngl-body>
            <ngl-body-row *ngFor="let row of list.rows" [row]="row"></ngl-body-row>
        </ngl-body>
        <ngl-footer></ngl-footer>
    `
})
export class NgLentaComponent implements OnInit, OnChanges {
    @Input() rows: any[] = [];
    @Input() columns: Column[] = [];

    constructor(public list: LentaList) { }

    ngOnInit() { }

    ngOnChanges(c: SimpleChanges) {
        if (c.columns) {
            this.setColumns(c.columns.currentValue);
        }
        if (c.rows) {
            this.setRows(c.rows.currentValue);
        }
    }

    private setColumns(columns: Column[]) {
        this.list.setColumns(columns);
    }

    private setRows(rows: any[]) {
        this.list.setRows(rows);
    }
}
