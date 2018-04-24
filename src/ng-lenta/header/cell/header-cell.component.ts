import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation, Output, EventEmitter, HostListener } from '@angular/core';
import { HeaderCell } from '../../model/state';

@Component({
    selector: 'ngl-header-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ngl-header-cell',
        '[class.ngl-cell-sortable]': 'cell.sortable',
        'role': 'columnheader'
    },
    template: `
        {{cell.value}}
        <ng-container *ngIf="cell.sortable">
            <span *ngIf="cell.sortOrder === 0" class="mdi mdi-sort"></span>
            <span *ngIf="cell.sortOrder === 1" class="mdi mdi-sort-ascending"></span>
            <span *ngIf="cell.sortOrder === 2" class="mdi mdi-sort-descending"></span>
        </ng-container>
    `
})
export class HeaderCellComponent implements OnInit {

    @Input() cell: HeaderCell;
    @Output() sort = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    @HostListener('click')
    onColumnClick() {
        this.cell.toggleSortOrder();
        this.sort.emit(this.cell);
    }
}
