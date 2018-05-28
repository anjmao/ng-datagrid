import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { HeaderCell } from '../../model/lenta-state';

@Component({
    selector: 'ngl-header-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ngl-header-cell',
        'role': 'columnheader'
    },
    template: `
        <span class="ngl-header-cell-value">{{cell?.value}}</span>
        <span class="ngl-sort-icon"></span>
    `
})
export class HeaderCellComponent implements OnInit {
    @Input() cell: HeaderCell | null = null;

    constructor() { }

    ngOnInit() {
        console.log('init');
    }
}
