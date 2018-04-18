import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { BodyCell } from '../../model/list';

@Component({
    selector: 'body-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ngl-body-cell'
    },
    template: `
        {{cell.value | json}}
    `
})
export class BodyCellComponent implements OnInit {

    @Input() cell: BodyCell;

    constructor() { }

    ngOnInit() { }
}
