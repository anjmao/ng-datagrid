import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { HeaderCell } from '../../model/list';

@Component({
    selector: 'ngl-header-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ngl-header-cell',
        'role': 'columnheader'
    },
    template: `
        {{cell.value}}
    `
})
export class HeaderCellComponent implements OnInit {

    @Input() cell: HeaderCell;

    constructor() { }

    ngOnInit() { 
        console.log('header cell', this.cell);
    }
}
