import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { HeaderCell, SortOrder } from '../model/state';

@Component({
    selector: 'ngl-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'ngl-header',
        'role': 'row'
    },
    template: `
        <ngl-header-cell *ngFor="let cell of cells"
            [class.ngl-cell-sortable]="cell.sortable"
            [class.ngl-sort-hide-icon]="cell.hideSortIcon"
            [class.ngl-sort-asc]="cell.sortOrder === 'asc'"
            [class.ngl-sort-desc]="cell.sortOrder === 'desc'"
            (click)="sort(cell)"
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
        cell.toggleSortOrder();
        cell.hideSortIcon = false;
        for (const c of this.cells) {
            if (c !== cell) {
                c.sortOrder = SortOrder.none;
                c.hideSortIcon = cell.sortOrder !== SortOrder.none;
            }
        }
        this.onSort.emit(cell);
    }
}

