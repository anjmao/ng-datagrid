import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { HeaderCell } from '../model/state';

@Component({
    selector: 'ngl-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'ngl-header',
        'role': 'row'
    },
    template: `
        <ngl-header-cell *ngFor="let cell of cells"
            [cell]="cell"
            (sort)="sort(cell)">
        </ngl-header-cell>
    `
})
export class HeaderComponent implements OnInit {
    @Input() cells: HeaderCell[] = [];
    @Output() onSort = new EventEmitter();
    
    constructor() { }

    ngOnInit() {
    }

    sort(cell: HeaderCell) {
        this.onSort.emit(cell);
    }
}
