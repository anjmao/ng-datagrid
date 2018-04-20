import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { BodyRow } from '../../model/list';

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
            <ngl-body-cell *ngFor="let cell of row.cells" [row]="row" [cell]="cell"></ngl-body-cell>
        </ng-template>

        <ng-template
            [ngTemplateOutlet]="row.template || defaultTemplate"
            [ngTemplateOutletContext]="{ row: row.ref }">
        </ng-template>
    `
})
export class BodyRowComponent implements OnInit {

    @Input() row: BodyRow;

    constructor() { }

    ngOnInit() { }
}
