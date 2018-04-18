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
    template: `
        <div *ngFor="let row of list.rows">
            <body-row [row]="row"></body-row>
        </div>
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
