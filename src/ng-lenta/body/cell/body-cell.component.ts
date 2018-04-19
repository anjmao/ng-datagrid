import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { BodyCell } from '../../model/list';

@Component({
    selector: 'ngl-body-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ngl-body-cell',
        'role': 'gridcell'
    },
    template: `
        {{cell.value}}
    `
})
export class BodyCellComponent implements OnInit {

    @Input() cell: BodyCell;

    constructor() { }

    ngOnInit() { }
}
