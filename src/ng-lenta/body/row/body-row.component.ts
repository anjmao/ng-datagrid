import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { BodyRow } from '../../model/state';

@Component({
    selector: 'ngl-body-row',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'ngl-body-row',
        'role': 'row'
    },
    template: `
        <ng-template #defaultTemplate>
            <ngl-body-cell 
                *ngFor="let cell of row?.cells"
                [ngStyle]="cell.col.size"
                [class.ngl-flex-1]="!cell.col.size"
                ngClass="ngl-body-{{cell.col.prop}}-cell"
                [row]="row"
                [cell]="cell">
            </ngl-body-cell>
        </ng-template>

        <ng-template
            [ngTemplateOutlet]="row?.template || defaultTemplate"
            [ngTemplateOutletContext]="{ row: row.ref }">
        </ng-template>
    `
})
export class BodyRowComponent implements OnInit {

    @Input() row: BodyRow | null = null;

    size = null;

    constructor() { }

    ngOnInit() {

    }
}
