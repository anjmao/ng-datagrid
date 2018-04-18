import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { BodyRow } from '../../model/list';

@Component({
    selector: 'body-row',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ngl-body-row'
    },
    template: `
        <body-cell *ngFor="let cell of row.cells" [cell]="cell"></body-cell>
    `
})
export class BodyRowComponent implements OnInit {

    @Input() row: BodyRow;

    constructor() { }

    ngOnInit() { }
}
