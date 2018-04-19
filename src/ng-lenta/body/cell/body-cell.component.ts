import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { BodyCell, BodyRow } from '../../model/list';

@Component({
    selector: 'ngl-body-cell',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ngl-body-cell',
        'role': 'gridcell'
    },
    template: `
        <ng-template #defaultTemplate>
            {{cell.value}}
        </ng-template>
    
        <ng-template
            [ngTemplateOutlet]="cell.template || defaultTemplate"
            [ngTemplateOutletContext]="{ row: row.ref }">
        </ng-template>
    `
})
export class BodyCellComponent implements OnInit {

    @Input() cell: BodyCell;
    @Input() row: BodyRow;

    constructor() { }

    ngOnInit() {

    }
}
